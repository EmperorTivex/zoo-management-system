import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { getAnimals, setAnimals, seedAnimals } from "../../utils/storage";
import defaultAnimals from "../../data/animals";
import SearchBar from "../../components/common/SearchBar";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";

const EMPTY_ANIMAL = {
  name: "",
  species: "",
  category: "Mammal",
  habitat: "",
  age: "",
  gender: "Male",
  weight: "",
  diet: "",
  healthStatus: "Healthy",
  conservationStatus: "Vulnerable",
  caretaker: "",
  feedingTime: "",
  image: "",
  description: "",
};

const ManageAnimals = () => {
  const [animals, setAnimalsState] = useState(() => {
    seedAnimals(defaultAnimals);
    return getAnimals();
  });
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_ANIMAL);

  const filteredAnimals = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return animals;
    return animals.filter(
      (a) =>
        a.name.toLowerCase().includes(query) ||
        a.species.toLowerCase().includes(query),
    );
  }, [animals, search]);

  const openAddModal = () => {
    setEditingId(null);
    setForm(EMPTY_ANIMAL);
    setModalOpen(true);
  };

  const openEditModal = (animal) => {
    setEditingId(animal.id);
    setForm({
      name: animal.name,
      species: animal.species,
      category: animal.category,
      habitat: animal.habitat,
      age: String(animal.age),
      gender: animal.gender,
      weight: animal.weight,
      diet: animal.diet,
      healthStatus: animal.healthStatus,
      conservationStatus: animal.conservationStatus,
      caretaker: animal.caretaker,
      feedingTime: animal.feedingTime,
      image: animal.image,
      description: animal.description,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(EMPTY_ANIMAL);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.species.trim()) {
      toast.error("Name and species are required.");
      return;
    }

    const animalData = {
      ...form,
      age: Number(form.age) || 0,
    };

    if (editingId) {
      const updated = animals.map((a) =>
        a.id === editingId ? { ...a, ...animalData, id: editingId } : a,
      );
      setAnimals(updated);
      setAnimalsState(updated);
      toast.success("Animal updated successfully.");
    } else {
      const slug = form.name.toLowerCase().replace(/\s+/g, "-").slice(0, 20);
      const newAnimal = {
        id: `${slug}-${Date.now()}`,
        ...animalData,
      };
      const updated = [newAnimal, ...animals];
      setAnimals(updated);
      setAnimalsState(updated);
      toast.success("Animal created successfully.");
    }

    closeModal();
  };

  const handleDelete = (animal) => {
    if (!window.confirm(`Delete ${animal.name}? This cannot be undone.`)) {
      return;
    }

    const updated = animals.filter((a) => a.id !== animal.id);
    setAnimals(updated);
    setAnimalsState(updated);
    toast.success("Animal deleted.");
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Animals</h2>
        <Button variant="primary" onClick={openAddModal}>
          <Plus className="w-4 h-4 inline mr-1" />
          Add Animal
        </Button>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by name or species..."
        className="mb-6 max-w-md"
      />

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Species</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Health</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredAnimals.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No animals found.
                </td>
              </tr>
            ) : (
              filteredAnimals.map((animal) => (
                <tr key={animal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {animal.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{animal.species}</td>
                  <td className="px-6 py-4">
                    <Badge variant="info">{animal.category}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        animal.healthStatus === "Healthy" ? "success" : "warning"
                      }
                    >
                      {animal.healthStatus}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(animal)}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      aria-label={`Edit ${animal.name}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(animal)}
                      className="inline-flex items-center text-red-600 hover:text-red-800 ml-2"
                      aria-label={`Delete ${animal.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">
                {editingId ? "Edit Animal" : "Add Animal"}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ["name", "Name", "text"],
                  ["species", "Species", "text"],
                  ["category", "Category", "text"],
                  ["habitat", "Habitat", "text"],
                  ["age", "Age", "number"],
                  ["gender", "Gender", "text"],
                  ["weight", "Weight", "text"],
                  ["diet", "Diet", "text"],
                  ["healthStatus", "Health Status", "text"],
                  ["conservationStatus", "Conservation Status", "text"],
                  ["caretaker", "Caretaker", "text"],
                  ["feedingTime", "Feeding Time", "text"],
                ].map(([name, label, type]) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  {editingId ? "Save Changes" : "Add Animal"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAnimals;
