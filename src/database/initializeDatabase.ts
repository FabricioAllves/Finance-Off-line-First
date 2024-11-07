import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
   await database.execAsync(`
    CREATE TABLE IF NOT EXISTS payment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      supplier TEXT NOT NULL,            
      type TEXT NOT NULL,                
      paymentMethod TEXT NOT NULL,       
      dueDate TEXT,                      
      amount REAL NOT NULL,              
      isSynced INTEGER DEFAULT 0,        
      isDeleted INTEGER DEFAULT 0,        
      idWeb INTEGER DEFAULT NULL  
    )
  `);
}
