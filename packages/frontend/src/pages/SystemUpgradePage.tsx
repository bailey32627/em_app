import { useState } from "react";
import axios from "axios";

// auth
import { useAuth } from '@em_app/shared';

// content
import { MainContent } from '../components/MainContent';


const SystemUpgradePage = () => {
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/systems/upgrade/", { name });
      // Redirect to Stripe Checkout
      window.location.href = res.data.checkout_url;
    } catch (err) {
      console.error("Upgrade failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContent>
      <h1>System Upgrade Page</h1>
    </MainContent>
  );
};

export default SystemUpgradePage;
