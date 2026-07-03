import { Registration } from '../types';
import { db, collection, doc, setDoc, getDocs, query, orderBy, where, OperationType, handleFirestoreError, auth } from '../firebase';

const COLLECTION_NAME = 'registrations';

// Get all registrations from Firestore
export const getAllRegistrations = async (vfoId?: string, isAdmin: boolean = false): Promise<Registration[]> => {
    try {
        let q;
        if (isAdmin || !vfoId) {
            q = query(collection(db, COLLECTION_NAME), orderBy('timestamp', 'desc'));
        } else {
            q = query(collection(db, COLLECTION_NAME), where('vfoId', '==', vfoId), orderBy('timestamp', 'desc'));
        }
        
        const querySnapshot = await getDocs(q);
        const registrations: Registration[] = [];
        querySnapshot.forEach((doc) => {
            registrations.push(doc.data() as Registration);
        });
        return registrations;
    } catch (error) {
        handleFirestoreError(error, OperationType.GET, COLLECTION_NAME);
        return [];
    }
};

// Add or update a registration on Firestore
export const upsertRegistration = async (registration: Registration): Promise<boolean> => {
    try {
        const regDoc = doc(db, COLLECTION_NAME, registration.id);
        // Ensure vfoId is set
        const dataToSave = {
            ...registration,
            vfoId: auth.currentUser?.uid || 'anonymous',
            updatedAt: new Date().toISOString()
        };
        await setDoc(regDoc, dataToSave, { merge: true });
        return true;
    } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${registration.id}`);
        return false;
    }
};

// Drafts management
export const saveDraft = async (draftId: string, data: any): Promise<void> => {
    try {
        const draftDoc = doc(db, 'drafts', draftId);
        await setDoc(draftDoc, {
            id: draftId,
            vfoId: auth.currentUser?.uid || 'anonymous',
            data,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `drafts/${draftId}`);
    }
};

export const getDrafts = async (): Promise<any[]> => {
    try {
        if (!auth.currentUser) return [];
        const q = query(collection(db, 'drafts'), where('vfoId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error('Error fetching drafts:', error);
        return [];
    }
};
