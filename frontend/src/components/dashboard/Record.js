import React, { useState, useEffect } from "react";
import axios from "axios";
import "./record.css";

export default function Record({ username }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [data, setData] = useState([]);
  const [s, sets] = useState("");

  useEffect(() => {
    getItem();
  }, []);

  async function getItem() {
    const res = await axios.post("/getitem", {
      username: username,
    });
    setData(res.data);
  }

  const additem = async (e) => {
    e.preventDefault();
    const res = await axios.post("/additem", {
      username: username,
      name: name,
      desc: desc,
      start: start,
      end: end,
    });
    await getItem();
  };

  async function deleteitem(itemid) {
    const res = await axios.post("/deleteitem", {
      id: itemid,
    });
    await getItem();
  }

  const searchitem = async () => {
    const res = await axios.post("/search", {
      username: username,
      name: s,
    });
    setData(res.data);
  };

  return (
    <div className="record">
      <div className="addrecord">
        <h4>Add New Item</h4>
        <form onSubmit={additem}>
          <table>
            <tbody>
              <tr>
                <td>Name: </td>
                <td>
                  <input
                    type="text"
                    placeholder="Name of the disease"
                    required={true}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </td>
              </tr>

              <tr>
                <td>Desc: </td>
                <td>
                  <textarea
                    placeholder="Description"
                    rows={4}
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                </td>
              </tr>

              <tr>
                <td>Start date: </td>
                <td>
                  <input
                    type="date"
                    onChange={(e) => setStart(e.target.value)}
                  ></input>
                </td>
              </tr>

              <tr>
                <td>End Date: </td>
                <td>
                  <input
                    type="date"
                    onChange={(e) => setEnd(e.target.value)}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="Add" id="addbtn"></input>
        </form>
      </div>

      <div className="showrecord">
        <h4>Hey {username}! ❤️We wish you a happy and healthy life❤️</h4>
        <div className="searchform">
          <input
            className="searchfield"
            placeholder="Enter disease name"
            onChange={(e) => {
              sets(e.target.value);
            }}
          ></input>
          <button id="srchbtn" onClick={searchitem}>
            SEARCH
          </button>
          <button id="showallbtn" onClick={() => getItem()}>SHOW ALL</button>
        </div>
        <div className="recordbox">
          {data.map((item) => (
            <div className="card" key={item._id}>
              <div className="cardhead">
                <div>{item.name}</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                  onClick={() => deleteitem(item._id)}
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
              </div>
              <div className="cardbody">
                <div>Description: {item.desc}</div>
                <div>
                  start: {item.start}
                  <br />
                  end: {item.end}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
