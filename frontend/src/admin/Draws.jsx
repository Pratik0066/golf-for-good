import { useState } from "react";
import Layout from "../layout/Layout";
import API from "../api/axios";
import DrawBalls from "../components/DrawBalls";

export default function Draws() {
  const [data, setData] = useState(null);

  const run = async () => {
    const res = await API.post("/draw/run");
    setData(res.data);
  };

  return (
    <Layout>
      <h1>Admin Draw</h1>

      <button onClick={run}>Run Draw</button>

      {data && <DrawBalls numbers={data.numbers} />}
    </Layout>
  );
}