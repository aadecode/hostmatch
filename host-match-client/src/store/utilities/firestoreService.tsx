import { EFirestoreKey } from ".";
import { firebase } from "../../config/fbConfig";

const DEFAULT_PAGE_LIMIT: number = 10;

export const formatSnapshot = (snapshot: any) => {
  return snapshot.docs
    ? snapshot.docs.map((doc: any): any => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      })
    : snapshot.data();
};

export interface ISearchArgs {
  fieldPath?: string;
  value: any;
  opStr?: any;
}

export const getDocs = (
  collection: string,
  searchArgs?: ISearchArgs | undefined
): any => {
  const db = firebase.firestore().collection(collection);
  if (!!searchArgs) {
    const { fieldPath, value } = { ...searchArgs };
    const _value: string = `${value}`.toLocaleLowerCase();
    //return db.where(fieldPath, "<=", value).limit(DEFAULT_PAGE_LIMIT);
    return db
      .orderBy(fieldPath || EFirestoreKey.searchKey)
      .startAt(_value)
      .endAt(_value + "~")
      .limit(DEFAULT_PAGE_LIMIT);
  }
  return db.limit(DEFAULT_PAGE_LIMIT);
};

export const getDocByField = (
  collection: string,
  searchArgs: ISearchArgs
): any => {
  const db = firebase.firestore().collection(collection);
  const { fieldPath, opStr, value } = { ...searchArgs };
  console.log("value ", value);
  return value
    ? db.where(fieldPath || EFirestoreKey.searchKey, opStr, value)
    : null;
};

export const getDocBy2Fields = (
  collection: string,
  searchArgs1: ISearchArgs,
  searchArgs2: ISearchArgs
): any => {
  const db = firebase.firestore().collection(collection);
  return searchArgs1.value && searchArgs2.value
    ? db
        .where(
          searchArgs1.fieldPath || EFirestoreKey.searchKey,
          searchArgs1.opStr,
          searchArgs1.value
        )
        .where(
          searchArgs2.fieldPath || EFirestoreKey.searchKey,
          searchArgs2.opStr,
          searchArgs2.value
        )
    : null;
};

export const getDocById = (collection: string, id: string): any => {
  return firebase.firestore().collection(collection).doc(id);
};

export const createDoc = (collection: string, payload: any): Promise<any> => {
  return firebase.firestore().collection(collection).add(payload);
};

export const deleteDoc = (collection: string, id: string): Promise<any> => {
  return firebase.firestore().collection(collection).doc(id).delete();
};

export const updateDoc = (
  collection: string,
  id: string,
  payload: any
): Promise<any> => {
  return firebase.firestore().collection(collection).doc(id).update(payload);
};

export const setDoc = (collection: string, payload: any): Promise<any> => {
  const { id, ...data }: any = { ...payload };
  return firebase.firestore().collection(collection).doc(id).set(data);
};
