import { useCallback, useEffect, useRef } from 'react'
import { useAppDispatch } from '../../store/store'
import { GenericActions } from '../../store/genericSlice'
import { DocumentData, collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { toast } from 'react-toastify'

type ListnerState = {
    name?: string
    unsubscribe: () => void
}

export const useFireStore = <T extends DocumentData>(path: string) => {
    const listenersRef = useRef<ListnerState[]>([]);

    // unsubscribe all listeners when component unmounts
    useEffect(() => {
        let listenerRefValue: ListnerState[] | null = null;

        if (listenersRef.current) {
            listenerRefValue = listenersRef.current;
        }

        return () => {
            if (listenerRefValue) {
                listenerRefValue.forEach(listener => {
                    listener.unsubscribe();
                })
            }
        }
    }, [])

    const dispatch = useAppDispatch();

    // listen to collection
    const loadCollection = useCallback((actions: GenericActions<T>) => {
        dispatch(actions.loading());

        const query = collection(db, path);

        const listener = onSnapshot(query, {
            next: querySnapshot => {
                const data: DocumentData[] = [];
                if (querySnapshot.empty) {
                    dispatch(actions.success([] as unknown as T));
                    return;
                }
                querySnapshot.forEach(doc => {
                    data.push({id: doc.id, ...doc.data()})
                })
                dispatch(actions.success(data as unknown as T))
            },
            error: error => {
                dispatch(actions.error(error.message));
                console.log('Collection error:', error.message);
            }
        })
        listenersRef.current.push({name: path, unsubscribe: listener});

    }, [dispatch, path])

    // load a single document
    const loadDocument = useCallback((id: string, actions: GenericActions<T>) => {
        dispatch(actions.loading());
        const docRef = doc(db, path, id);

        const listener = onSnapshot(docRef, {
            next: doc => {
                if (!doc.exists) {
                    dispatch(actions.error('Document does not exist'));
                    return;
                }
                dispatch(actions.success({id: doc.id, ...doc.data()} as unknown as T))
            }
        })
        listenersRef.current.push({name: path + '/' + id, unsubscribe: listener})
    }, [dispatch, path])

    // create a document
    const create = async (data: T) => {
        try {
            const ref = doc(collection(db, path));
            await setDoc(ref, data);
            return ref;
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // update a document
    const update = async (id: string, data: T) => {
        const docRef = doc(db, path, id);
        try {
            return await updateDoc(docRef, data);
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // remove a document
    const remove = async (id: string) => {
        try {
            return await deleteDoc(doc(db, path, id));
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // set a document with a specific id
    const set = async (id: string, data: any) => {
        try {
            return await setDoc(doc(db, path, id), data);
        } catch (error: any) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return {loadCollection, loadDocument, create, update, remove, set}
}