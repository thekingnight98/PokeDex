import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

// components
import FavPoke from "./components/FavPoke";
import ReactLoading from "react-loading";

function App() {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      setLoading(true);
      try {
        let res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`,
          {
            signal: abortController.signal,
          }
        );

        setPoke(res.data);
        setError("");
      } catch (error) {
        setLoading(false);
        setError("someting went wrog !!!");
      } finally {
        setLoading(false);
      }
    };

    loadPoke();
    return () => abortController.abort();
  }, [number]);
  // number มีการเปลี่ยนแปลง จะทำการ fetch ใหม่ประโยชน์ของ useEffect

  const PrevPoke = () => {
    setNumber((number) => number - 1);
  };

  const NextPoke = () => {
    setNumber((number) => number + 1);
  };

  const UpdateFav = () => {
    setFav((oldState) => [...oldState, poke]);
  };
  console.log("poke ==>", poke);
  console.log("fav ==>", fav);

  return (
    <div className="block max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div>
          {loading ? (
            <div className="flex justify-center items-center">
              <ReactLoading
                type="spin"
                color="white"
                height={"20%"}
                width={"20%"}
              />
            </div>
          ) : (
            <div>
              <h1>{poke.name}</h1>
              <button className="mt-4" onClick={UpdateFav}>
                Add to Favorite
              </button>
              <br />

              <img
                src={poke?.sprites?.other?.home?.front_default}
                alt={poke.name}
              />
              <ul>
                {poke?.abilities?.map((abil, index) => (
                  <li key={index}>{abil?.ability?.name}</li>
                ))}
              </ul>
              <br />
              <button onClick={PrevPoke}>Previos</button>
              <button className="ml-2" onClick={NextPoke}>
                Next
              </button>
            </div>
          )}
        </div>

        <div>
          <h2>Your Favorite pokemon</h2>
          {fav.length > 0 ? (
            <FavPoke fav={fav} />
          ) : (
            <div className="flex justify-center items-center">
              No favorite pokemon
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
