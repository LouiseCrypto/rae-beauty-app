// @ts-nocheck

/**
 * Rae Beauty Database Placeholder
 * This file provides the "fake" data to make the app look beautiful 
 * while we prepare the real SQLite database.
 */

export const getDB = () => {
  return {
    // Financials data
    payments: [
      { id: '1', clientId: '1', amount: 85, date: '2026-02-10', status: 'completed', service: 'Full Set Lashes' },
      { id: '2', clientId: '2', amount: 45, date: '2026-02-11', status: 'completed', service: 'Nail Infills' },
      { id: '3', clientId: '3', amount: 120, date: '2026-02-12', status: 'pending', service: 'Bridal Package' }
    ],
    
    // Client Vault data
    clients: [
      { id: '1', name: 'Alice Miller', email: 'alice@example.com', phone: '07123456789', lastVisit: '2026-02-10' },
      { id: '2', name: 'Sarah Jones', email: 'sarah@example.com', phone: '07987654321', lastVisit: '2026-02-11' },
      { id: '3', name: 'Emma Wilson', email: 'emma@example.com', phone: '07456123789', lastVisit: '2026-01-25' }
    ],
    
    // Inventory Tracker data
    inventory: [
      { id: '1', name: 'Sage Green Gel Polish', brand: 'LuxeNail', quantity: 2, minThreshold: 3, category: 'Gel' },
      { id: '2', name: 'Nail Prep Dehydrator', brand: 'PureCare', quantity: 10, minThreshold: 2, category: 'Prep' },
      { id: '3', name: 'Top Coat Gloss', brand: 'LuxeNail', quantity: 1, minThreshold: 4, category: 'Gel' }
    ],
    
    // Special Orders (The missing piece that caused the Inventory white screen!)
    specialOrders: [
      { id: '1', itemName: 'Limited Edition Glitter', clientName: 'Alice M.', status: 'Ordered', dateRequested: '2026-02-12' }
    ],
    
    // Calendar data
    appointments: [
      { id: '1', title: 'Full Set - Alice', start: '2026-02-14T10:00:00', end: '2026-02-14T12:00:00', clientId: '1' }
    ]
  };
};

/**
 * Placeholder for saving data
 * This allows the buttons in your app to "work" without crashing.
 */
export const saveDB = (data: any) => {
  console.log("Saving to database...", data);
  // In the future, this is where your Python/SQLite logic will go!
  return true;
};