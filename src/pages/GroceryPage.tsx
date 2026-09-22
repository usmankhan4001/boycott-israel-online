import React from 'react';
import { GroceryPlanner } from '../components/GroceryPlanner';
import { useGroceryStore } from '../stores/groceryStore';
import { useProducts } from '../hooks/useProducts';
import { useUIStore } from '../stores/uiStore';
import { getStoredNotificationSettings, saveStoredNotificationSettings, saveStoredGroceryList } from '../utils/storage';

export const GroceryPage: React.FC = () => {
  const groceryList = useGroceryStore(state => state.groceryList);
  // Need to provide a setter for GroceryPlanner for compatibility, even though we use Zustand internally
  const setGroceryList = (newListOrUpdater: any) => {
    // For full compatibility with the existing component, we might need a small wrapper,
    // but typically GroceryPlanner handles its own state updates via props.
    // Assuming GroceryPlanner will just call setGroceryList with the new array
    if (typeof newListOrUpdater === 'function') {
       const updated = newListOrUpdater(groceryList);
       useGroceryStore.setState({ groceryList: updated });
       saveStoredGroceryList(updated);
    } else {
       useGroceryStore.setState({ groceryList: newListOrUpdater });
       saveStoredGroceryList(newListOrUpdater);
    }
  };

  const { products } = useProducts();
  const [notificationSettings, setNotificationSettings] = React.useState(getStoredNotificationSettings());

  // Wrap setNotificationSettings to also persist
  const handleSetNotificationSettings = (settings: any) => {
    const updated = typeof settings === 'function' ? settings(notificationSettings) : settings;
    setNotificationSettings(updated);
    saveStoredNotificationSettings(updated);
  };

  return (
    <div className="animate-in fade-in duration-200">
      <GroceryPlanner
        groceryList={groceryList}
        setGroceryList={setGroceryList}
        notificationSettings={notificationSettings}
        setNotificationSettings={handleSetNotificationSettings}
        products={products}
      />
    </div>
  );
};
