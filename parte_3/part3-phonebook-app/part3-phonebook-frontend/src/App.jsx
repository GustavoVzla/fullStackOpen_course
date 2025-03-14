import { useState, useEffect } from "react";
import personService from "./services/personService";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialPersons = await personService.getAll();
        setPersons(initialPersons);
      } catch (error) {
        console.error("Error fetching data: ", error);
        showNotification("Error loading contacts from server", "error");
      }
    };
    fetchData();
  }, []);

  const showNotification = (message, type) => {
    if (typeof message === "object" && message.error) {
      setNotificationMessage(message.error);
    } else {
      setNotificationMessage(message);
    }

    setNotificationType(type);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const addPerson = async (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook. Replace the old number with a new one?`
      );
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        try {
          const returnedPerson = await personService.update(
            existingPerson.id,
            updatedPerson
          );
          setPersons(
            persons.map((person) =>
              person.id !== existingPerson.id ? person : returnedPerson
            )
          );
          showNotification(
            `Updated ${returnedPerson.name}'s number successfully`,
            "success"
          );
          setNewName("");
          setNewNumber("");
        } catch (error) {
          console.error("Error updating person: ", error);

          if (error.response && error.response.data) {
            showNotification(error.response.data, "error");
          } else {
            showNotification(
              `Error updating ${existingPerson.name}'s number, maybe has already been removed from server`,
              "error"
            );
          }
        }
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      try {
        const returnedPerson = await personService.create(newPerson);
        setPersons(persons.concat(returnedPerson));
        showNotification(
          `Added ${returnedPerson.name} successfully`,
          "success"
        );
        setNewName("");
        setNewNumber("");
      } catch (error) {
        console.error("Error adding new person: ", error);

        if (error.response && error.response.data) {
          showNotification(error.response.data, "error");
        } else {
          showNotification(`Error adding ${newPerson.name}`, "error");
        }
      }
    }
  };

  const handleDeletePerson = async (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      try {
        await personService.deletePerson(id);
        setPersons(persons.filter((person) => person.id !== id));
        showNotification(`Deleted ${name}`, "success");
      } catch (error) {
        console.error("Error deleting person: ", error);
        showNotification(`Error deleting ${name}`, "error");
      }
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter value={searchTerm} onChange={handleSearchTermChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDeletePerson} />
    </div>
  );
};

export default App;
