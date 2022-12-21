import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  Timestamp,
  updateDoc,
} from '@angular/fire/firestore';
import { Category, ICategory } from './views/models/category';
import { Expense } from './views/models/expenses-model';
import moment from 'moment';
import { Budget } from './views/models/budget';

@Injectable({
  providedIn: 'root',
})
export class IncomeExpenseTrackingService {
  constructor(private firestore: Firestore) {}

  get_categorias(recordType: string): Category[] {
    let categorias: Category[] = [];
    const q = query(
      collection(this.firestore, 'categorias'),
      where('isActive', '==', true),
      where('recordTypeCode', '==', recordType)
    );
    const querySnapshot = getDocs(q);
    querySnapshot.then((documents) => {
      documents.forEach((doc) => {
        let document = new Category({ id: doc.id, ...doc.data() });

        categorias.push(document);
      });
    });
    return categorias;
  }

  get_all_categorias() {
    // let categorias: Category[] = [];
    // const q = query(
    //   collection(this.firestore, 'categorias'),
    //   where('isActive', '==', true)
    // );
    // const querySnapshot = getDocs(q);
    // querySnapshot.then((documents) => {
    //   documents.forEach((doc) => {
    //     let document = new Category({ id: doc.id, ...doc.data() });

    //     categorias.push(document);
    //   });
    // });
    // return categorias;

    const docRef = collection(this.firestore, 'records');
    return collectionData(docRef, { idField: 'id' });
  }

  get_budgets() {
    const docRef = collection(this.firestore, 'budget_user');
    return collectionData(docRef, { idField: 'id' });
  }

  get_records() {
    const docRef = collection(this.firestore, 'records');
    return collectionData(docRef, { idField: 'id' });
  }

  get_userSettings() {
    const docRef = collection(this.firestore, 'user_settings');
    return collectionData(docRef, { idField: 'id' });
  }

  get_registros(): Expense[] {
    let registros: Expense[] = [];
    const q = query(
      collection(this.firestore, 'records'),
      where('isActive', '==', true)
    );
    const querySnapshot = getDocs(q);
    querySnapshot.then((documents) => {
      documents.forEach((doc) => {
        let document = new Expense(
          doc.id,
          doc.data()['categoryCode'],
          doc.data()['categoryName'],
          doc.data()['date'].toDate(),
          doc.data()['isActive'],
          doc.data()['amount'],
          doc.data()['recordType'],
          doc.data()['notes']
        );

        registros.push(document);
      });
    });
    return registros;
  }

  add_nuevo_registro(data: Expense) {
    const recordsRef = collection(this.firestore, 'records');

    return addDoc(recordsRef, {
      categoryCode: data.categoryCode,
      categoryName: data.categoryName,
      notes: data.notes,
      date: data.date,
      recordType: data.recordType,
      isActive: data.isActive,
      amount: data.amount,
    });
  }

  add_nuevo_presupuesto(data: Budget) {
    const budgetsRef = collection(this.firestore, 'budget_user');

    return addDoc(budgetsRef, {
      budgetName: data.budgetName,
      creationDate: data.creationDate,
      currencyName: data.currencyName,
      currencySymbol: data.currencySymbol,
      budget: data.budget,
      referencia: data.referencia,
      default: data.isDefault,
    });
  }

  update_record(data: Expense) {
    const recordRef = doc(this.firestore, 'records', data.id);
    return updateDoc(recordRef, {
      categoryCode: data.categoryCode,
      categoryName: data.categoryName,
      notes: data.notes,
      date: data.date,
      recordType: data.recordType,
      isActive: data.isActive,
      amount: data.amount,
    });
  }

  remove_record(id: string) {
    const recordRef = doc(this.firestore, 'records', id);
    return deleteDoc(recordRef);
  }

  update_budget(data: Budget) {
    const recordRef = doc(this.firestore, 'budget_user', data.id);
    return updateDoc(recordRef, {
      budget: data.budget,
    });
  }

  remove_budget(id: string) {
    const recordRef = doc(this.firestore, 'budget_user', id);
    return deleteDoc(recordRef);
  }
}
