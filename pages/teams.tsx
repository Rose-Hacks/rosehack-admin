import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import {
  FaRegCopy,
  FaTrophy,
  FaSearch,
  FaAngleDown,
  FaCheck,
  FaTimes,
  FaPencilAlt,
} from "react-icons/fa";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Badge } from "react-bootstrap";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [user, setUser] = useState<string | null>("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [trigger, setTrigger] = useState(false);
  const [noteEdit, setNoteEdit] = useState(false);
  const [prizeEdit, setPrizeEdit] = useState(false);
  const [note, setNote] = useState("");
  const [prize, setPrize] = useState("");
  const [snackBar, setSnackBar] = useState(
    "hidden z-50 bg-black/60 text-white text-center p-2 fixed bottom-[30px] left-1/2 -translate-x-1/2"
  );

  const copyToClipboard = async (copyText: string) => {
    await navigator.clipboard.writeText(copyText);
    setSnackBar(
      "visible z-50 bg-black/60 text-white text-center p-2 fixed bottom-[30px] left-1/2 -translate-x-1/2"
    );
    setTimeout(() => {
      setSnackBar(
        "hidden z-50 bg-black/60 text-white text-center p-2 fixed bottom-[30px] left-1/2 -translate-x-1/2"
      );
    }, 1000);
  };

  const handleUpdate = async (
    field: string,
    id: string,
    status: string | boolean
  ) => {
    await axios.post("/api/updateTeamField", {
      field,
      id,
      status,
    });
    setTrigger(!trigger);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentState) => {
      if (
        currentState !== null &&
        currentState.email === "rosehackucr@gmail.com"
      )
        setUser("rosehackucr@gmail.com");
    });
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get("/api/getAllTeams")
        .then((response) => {
          setTeams(response.data);
          setFilteredTeams(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    void getUsers();
  }, [trigger]);

  const handleSearch = () => {
    setFilteredTeams(
      teams.filter((team: any) => {
        return (
          search.trim() === team.id.trim() ||
          team.data.name
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase()) === true ||
          team.data.members[0]
            .toLowerCase()
            .trim()
            .includes(search.trim().toLowerCase())
        );
      })
    );
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    if (status !== "all") {
      setFilteredTeams(
        teams.filter((team: any) => {
          return status === team.data.status;
        })
      );
    } else {
      setFilteredTeams(teams);
    }
  };

  if (user === "rosehackucr@gmail.com") {
    return (
      <div className="min-h-screen p-5 bg-admin-primary flex justify-center items-center flex-col">
        <p className="font-pixel text-3xl text-white">
          {filteredTeams.length} {filteredTeams.length === 1 ? "Team" : "Teams"}
        </p>
        <div className="w-11/12 my-5">
          <div className="w-full flex flex-row justify-start items-center">
            <Badge
              className={`${
                statusFilter === "all" ? "!bg-blue-400" : "!bg-admin-dark/40"
              } hover:!bg-blue-400 hover:cursor-pointer !rounded-tl-2xl !rounded-bl-none !rounded-br-none !rounded-tr-none !text-base !font-lexand !text-white border-l-4 border-t-4 border-white p-2`}
              bg="none"
              onClick={() => handleStatusFilter("all")}
            >
              All
            </Badge>
            <Badge
              className={`${
                statusFilter === "approved"
                  ? "!bg-green-400"
                  : "!bg-admin-dark/40"
              } hover:!bg-green-400 !font-lexand border-x-4 hover:cursor-pointer !rounded-none !text-base !font-lexand !text-white border-r-4 border-t-4 border-white p-2`}
              bg="none"
              onClick={() => handleStatusFilter("approved")}
            >
              Qualified
            </Badge>
            <Badge
              className={`${
                statusFilter === "rejected"
                  ? "!bg-red-400"
                  : "!bg-admin-dark/40"
              } hover:!bg-red-400 hover:cursor-pointer !rounded-tl-none !rounded-bl-none !rounded-br-none !rounded-tr-2xl !text-base !font-lexand !text-white border-r-4 border-t-4 border-white p-2`}
              bg="none"
              onClick={() => handleStatusFilter("rejected")}
            >
              Disqualified
            </Badge>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <input
              className="w-11/12 appearance-none focus:outline-0 active:outline-0 bg-transparent border-4 border-white rounded-bl-3xl rounded-br-3xl rounded-tr-3xl  p-2 text-xl font-lexand text-white"
              type="text"
              placeholder="Team Name or Team ID"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <FaSearch
              onClick={handleSearch}
              className="text-3xl text-white hover:cursor-pointer mx-2"
            />
          </div>
        </div>
        <div className="w-11/12 border-4 border-white rounded-t-2xl  bg-admin-dark/40 flex flex-row">
          <div className="text-center w-1/12 border-r-2 border-white text-white text-base font-lexand">
            STATUS
          </div>
          <div className="text-center w-1/3 border-r-2 border-white text-white text-base font-lexand">
            NAME
          </div>
          <div className="text-center w-1/3 border-r-2 border-white text-white text-base font-lexand">
            TEAM ID
          </div>
          <div className="text-center w-1/3 border-white text-white text-base font-lexand">
            ACTION
          </div>
        </div>
        <div className="w-11/12 border-x-4 border-white bg-admin-dark/40">
          <Accordion className="[list-style:none]" bsPrefix="bootstrap">
            {filteredTeams.map((team: any, index: number) => (
              <Accordion.Item
                eventKey={`${index}`}
                key={index}
                className="w-full"
              >
                <Accordion.Header className="w-full border-b-4 border-white list-unstyled">
                  <div className="text-center w-1/12 border-r-2 border-white flex justify-center items-center">
                    {team.data.status === "approved" ? (
                      <FaCheck className="text-green-500 text-xl" />
                    ) : (
                      <FaTimes className="text-red-500 text-xl" />
                    )}
                  </div>

                  <div className="w-1/3 border-r-2 border-white flex justify-start items-center">
                    <div className="text-center text-white text-lg font-lexand ml-2">
                      {team.data.members.length === 1 &&
                      team.data.name === "Untitled Team" ? (
                        <>{team.data.members[0]}</>
                      ) : (
                        <>{team.data.name}</>
                      )}
                    </div>
                    {team.data.prize === true ? (
                      <FaTrophy className="text-yellow-300 text-lg ml-2" />
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="text-center w-1/3 border-r-2 border-white flex justify-start items-center">
                    <div className="text-center text-white text-sm font-lexand ml-2">
                      {team.id}
                    </div>
                    <FaRegCopy
                      className="ml-2 text-blue-300 text-lg font-lexand"
                      onClick={() => {
                        void copyToClipboard(team.id);
                      }}
                    />
                  </div>

                  <div className="text-center w-1/3 border-white text-white text-base font-lexand flex flex-row items-center justify-center">
                    <div className="flex w-9/12 flex-row justify-between items-center">
                      {team.data.status === "approved" ? (
                        <>
                          <Button variant="secondary" disabled>
                            <FaCheck className="text-xl" />
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => {
                              void handleUpdate("status", team.id, "rejected");
                            }}
                          >
                            <FaTimes className="text-xl" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="success"
                            onClick={() => {
                              void handleUpdate("status", team.id, "approved");
                            }}
                          >
                            <FaCheck className="text-xl" />
                          </Button>
                          <Button variant="secondary" disabled>
                            <FaTimes className="text-xl" />
                          </Button>
                        </>
                      )}
                      {team.data.prize === true ? (
                        <FaTimes
                          onClick={() => {
                            void handleUpdate("prize", team.id, false);
                          }}
                          className="text-red-300 text-2xl ml-2"
                        />
                      ) : (
                        <FaTrophy
                          onClick={() => {
                            void handleUpdate("prize", team.id, true);
                          }}
                          className="text-yellow-300 text-2xl ml-2"
                        />
                      )}
                      <FaAngleDown className="text-white text-2xl ml-2" />
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className=" w-full flex justify-center items-center flex-col border-b-4 border-white text-white">
                  <div className="w-11/12 flex justify-center items-center p-2">
                    <div className="w-1/3">
                      <p className="m-0 p-0 text-lg font-black font-lexend">
                        Team Members
                      </p>
                      <div className="p-0 m-0">
                        {team.data.members.map(
                          (member: string, index: number) => (
                            <p key={index} className="m-0 p-0 font-lexend">
                              {member}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="m-0 p-0 text-lg font-black font-lexend flex items-center">
                        Notes
                        {noteEdit ? (
                          <FaCheck
                            onClick={() => {
                              setNoteEdit(false);
                              if (note !== team.data.logs) {
                                void handleUpdate("logs", team.id, note);
                              }
                            }}
                            className="text-green-300 text-lg ml-2 hover:cursor-pointer"
                          />
                        ) : (
                          <FaPencilAlt
                            onClick={() => setNoteEdit(true)}
                            className="text-gray-300 text-lg ml-2 hover:cursor-pointer"
                          />
                        )}
                      </div>
                      <div className="p-0 m-0 ">
                        {noteEdit ? (
                          <input
                            value={note}
                            placeholder={
                              team.data.logs === ""
                                ? "No Notes"
                                : team.data.logs
                            }
                            onChange={(e) => setNote(e.target.value)}
                            className="text-white bg-transparent"
                          />
                        ) : team.data.logs === "" ? (
                          "No Notes"
                        ) : (
                          team.data.logs
                        )}
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="m-0 p-0 text-lg font-black font-lexend flex items-center">
                        Prize Information
                        {prizeEdit ? (
                          <FaCheck
                            onClick={() => {
                              setPrizeEdit(false);
                              if (prize !== team.data.prizeLogs) {
                                void handleUpdate("prizeLogs", team.id, prize);
                              }
                            }}
                            className="text-green-300 text-lg ml-2 hover:cursor-pointer"
                          />
                        ) : (
                          <FaPencilAlt
                            onClick={() => setPrizeEdit(true)}
                            className="text-gray-300 text-lg ml-2 hover:cursor-pointer"
                          />
                        )}
                      </div>
                      <div className="p-0 m-0">
                        {prizeEdit ? (
                          <input
                            value={prize}
                            placeholder={
                              team.data.prizeLogs === ""
                                ? "No Notes"
                                : team.data.prizeLogs
                            }
                            onChange={(e) => setPrize(e.target.value)}
                            className="text-white bg-transparent"
                          />
                        ) : team.data.prizeLogs === "" ? (
                          "No Notes"
                        ) : (
                          team.data.prizeLogs
                        )}
                      </div>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
        <div className="w-11/12 h-8 border-x-4 border-b-4 border-white rounded-b-2xl  bg-admin-dark/40 flex flex-row" />
        <div className={snackBar}>Team ID Copied</div>
      </div>
    );
  }
};

export default Teams;
