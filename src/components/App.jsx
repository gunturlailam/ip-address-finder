import { useEffect, useState } from "react";
import axios from "axios";
import Map from "./components/Map";
import "./App.css";

function App() {
  const [ipDetails, setIpDetails] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://ipapi.co/json")
      .then((res) => {
        setIpDetails(res.data);
        setLat(res.data.latitude);
        setLon(res.data.longitude);
      })
      .catch((err) => {
        setError("Gagal mengambil data IP. Coba lagi nanti.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Memuat Data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h1 className="heading">🌍 IP Address Finder</h1>
      <div className="content">
        <div className="info-panel">
          <h4>Alamat IPv4 Anda:</h4>
          <h1 className="ip-address">{ipDetails?.ip}</h1>
          <h4>Perkiraan Lokasi:</h4>
          <p>
            {ipDetails?.city}, {ipDetails?.region}, {ipDetails?.country_name}
            <h4>Penyedia Layanan Internet (ISP):</h4>
            <p>{ipDetails?.org}</p>
          </p>
        </div>
        <div className="map-panel">
          {lat && lon ? (
            <Map lat={lat} lon={lon} />
          ) : (
            <p>Menunggu koordinat...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
