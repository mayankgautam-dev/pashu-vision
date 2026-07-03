import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { Registration } from '../types';
import { storage, ref, uploadString, getDownloadURL, db, doc, setDoc, OperationType, handleFirestoreError } from '../firebase';

export const generateCertificatePDF = async (registration: Registration): Promise<string> => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFillColor(10, 50, 10); // Dark green
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text('पशुVision Identification Certificate', pageWidth / 2, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.text('Ministry of Animal Husbandry & Dairying, Government of India', pageWidth / 2, 30, { align: 'center' });
  
  // Owner Details
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Owner Details', 20, 55);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text(`Name: ${registration.owner.name}`, 20, 65);
  doc.text(`Mobile: ${registration.owner.mobile}`, 20, 72);
  doc.text(`Address: ${registration.owner.address}, ${registration.owner.village}`, 20, 79);
  doc.text(`District: ${registration.owner.district}, ${registration.owner.state}`, 20, 86);
  
  // Registration Info
  doc.setFont('helvetica', 'bold');
  doc.text('Registration Info', 120, 55);
  doc.setFont('helvetica', 'normal');
  doc.text(`Reg ID: ${registration.id}`, 120, 65);
  doc.text(`Date: ${new Date(registration.timestamp).toLocaleDateString()}`, 120, 72);
  doc.text(`Status: ${registration.status || 'Completed'}`, 120, 79);
  
  // QR Code
  const qrData = `https://pashuvision.gov.in/verify/${registration.id}`;
  const qrCodeDataUrl = await QRCode.toDataURL(qrData);
  doc.addImage(qrCodeDataUrl, 'PNG', 160, 85, 30, 30);
  doc.setFontSize(8);
  doc.text('Scan to verify', 175, 118, { align: 'center' });
  
  // Animal Details
  let yPos = 130;
  registration.animals.forEach((animal, index) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, yPos - 5, pageWidth - 20, yPos - 5);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`Animal #${index + 1}: ${animal.aiResult.breedName} (${animal.species})`, 20, yPos);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Sex: ${animal.sex}`, 20, yPos + 7);
    doc.text(`Age: ${animal.ageValue} ${animal.ageUnit}`, 20, yPos + 14);
    doc.text(`Confidence: ${animal.aiResult.confidence}%`, 20, yPos + 21);
    
    // Reasoning
    const reasoning = typeof animal.aiResult.reasoning === 'string' ? animal.aiResult.reasoning : animal.aiResult.reasoning.en;
    const splitReasoning = doc.splitTextToSize(`Reasoning: ${reasoning}`, pageWidth - 40);
    doc.text(splitReasoning, 20, yPos + 28);
    
    yPos += 35 + (splitReasoning.length * 5);
  });
  
  // Footer
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text('This is a computer-generated document. No physical signature is required.', pageWidth / 2, 285, { align: 'center' });
  
  const pdfBase64 = doc.output('datauristring');
  return pdfBase64;
};

export const saveAndUploadCertificate = async (registration: Registration): Promise<string> => {
  try {
    const pdfDataUrl = await generateCertificatePDF(registration);
    const storageRef = ref(storage, `certificates/${registration.id}.pdf`);
    
    // Upload to Firebase Storage
    await uploadString(storageRef, pdfDataUrl, 'data_url');
    const downloadUrl = await getDownloadURL(storageRef);
    
    // Save metadata to Firestore
    const certDoc = doc(db, 'certificates', registration.id);
    await setDoc(certDoc, {
      id: registration.id,
      registrationId: registration.id,
      pdfUrl: downloadUrl,
      createdAt: new Date().toISOString()
    });
    
    return downloadUrl;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `certificates/${registration.id}`);
    return '';
  }
};
