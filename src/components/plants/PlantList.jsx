import { SearchContext } from "@/context/SearchProvider";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye as EyeIcon, Heart as HeartIcon } from "lucide-react";

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageNumber, setPageNumber] = useState(2);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(true);

  const { search: searchQuery } = useContext(SearchContext);

  const navigate = useNavigate();

  const fetchPlants = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://localhost:7286/api/Plant?PageNumber=${page}&PageSize=8`
      );
      const data = await response.json();

      if (data.isSuccess && data.value?.items) {
        setPlants(data.value.items);
        setHasNextPage(data.value.hasNextPage);
        setHasPrevPage(data.value.hasPreviousPage);
        setPageNumber(page);
      } else {
        setError("No plants found or invalid API response.");
        setHasNextPage(false);
      }
    } catch (error) {
      console.error("Error fetching plants:", error);
      setError("Failed to fetch plants.");
      setHasNextPage(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const handleSearch = async () => {
        setLoading(true);
        try {
          console.log("searchQuery", searchQuery);
          const response = await fetch(
            `https://localhost:7286/api/Plant/GetByName?Name=${searchQuery}`
          );
          const data = await response.json();
          console.log("data", data);
          if (response.ok) {
            const items = Array.isArray(data) ? data : [data];
            setPlants(items);
            setHasNextPage(false); // Disable pagination on search
            setError("");
          } else {
            setPlants([]);
            setError("No plant found.");
          }
        } catch (err) {
          console.error("Search error:", err);
          setError("Error searching for plant.");
        }
        setLoading(false);
      };

      handleSearch();
    } else {
      fetchPlants(pageNumber); // Fetch plants if no search query
    }
  }, [searchQuery, pageNumber]);

  const loadNextPage = () => {
    if (hasNextPage) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  };

  const loadPrevPage = () => {
    if (hasPrevPage) {
      setPageNumber((currPage) => currPage - 1);
    }
  };

  return (
    <div className="w-full h-auto p-6 pb-[100px] bg-[#F0F9EB]">
      {/* <h2 className="text-[40px] text-center font-semibold my-5 mb-10">
        Indoor Plants
      </h2> */}

      {error && plants.length === 0 && (
        <div className="text-center py-10 text-red-500">{error}</div>
      )}

      <div className="p-3 w-full h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
        {plants.length === 0 && !loading ? (
          <div className="col-span-full text-center text-gray-500">
            No plants available at the moment.
          </div>
        ) : (
          plants.map((plant) => (
            <div
              key={plant.id}
              className="relative shadow-lg h-[300px] w-full max-w-[300px] rounded-lg flex flex-col bg-white hover:shadow-xl transition"
              onClick={() => navigate(`/plant/${plant.id}`)}
            >
              <div className="w-full h-[200px] overflow-hidden rounded-t-xl">
                <img
                  src={plant.imageUrl || "default-image-url.jpg"}
                  alt={plant.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Icons */}
                <div className="absolute top-2 right-2 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white p-2 rounded shadow hover:bg-gray-100">
                    <EyeIcon className="w-4 h-4 text-pink-500" />
                  </button>
                  <button className="bg-white p-2 rounded shadow hover:bg-gray-100">
                    <HeartIcon className="w-4 h-4 text-pink-500" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-center p-4 flex-grow text-center">
                <p className="text-md font-semibold truncate">{plant.name}</p>
                <p className="text-green-600 text-md font-medium">
                  {plant.categoryName}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {loading && <div className="text-center py-10">Loading...</div>}

      <div className="flex gap-8 justify-center">
        {hasPrevPage && !loading && !searchQuery && (
          <div className="text-center mt-8">
            <button
              className="text-green-600 font-semibold hover:text-green-800"
              onClick={loadPrevPage}
            >
              <div className="flex gap-4">
                <ArrowLeft /> Prev Page
              </div>
            </button>
          </div>
        )}
        {hasNextPage && !loading && !searchQuery && (
          <div className="text-center mt-8">
            <button
              className="text-green-600 font-semibold hover:text-green-800"
              onClick={loadNextPage}
            >
              <div className="flex gap-4">
                Next Page <ArrowRight />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantList;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const PlantList = () => {
//   const [plants, setPlants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [pageNumber, setPageNumber] = useState(1);
//   const [hasNextPage, setHasNextPage] = useState(true);

//   const navigate = useNavigate();

//   const fetchPlants = async (page) => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://localhost:7286/api/Plant?page=${page}`
//       );
//       const data = await response.json();

//       if (data.isSuccess && data.value?.items) {
//         setPlants(data.value.items);
//         setHasNextPage(data.value.hasNextPage);
//         setPageNumber(page);
//       } else {
//         setError("No plants found or invalid API response.");
//         setHasNextPage(false);
//       }
//     } catch (error) {
//       console.error("Error fetching plants:", error);
//       setError("Failed to fetch plants.");
//       setHasNextPage(false);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchPlants(pageNumber);
//   }, []);

//   const loadNextPage = () => {
//     if (hasNextPage) {
//       fetchPlants(pageNumber + 1);
//     }
//   };

//   return (
//     <div className="w-full h-auto p-6 pb-[100px] bg-[#F0F9EB]">
//       <h2 className="text-[40px] text-center font-semibold my-5 mb-10">
//         Indoor Plants
//       </h2>

//       {error && <div className="text-center py-10 text-red-500">{error}</div>}

//       <div className="p-3 w-full h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
//         {plants.length === 0 && !loading ? (
//           <div className="col-span-full text-center text-gray-500">
//             No plants available at the moment.
//           </div>
//         ) : (
//           plants.map((plant) => (
//             <div
//               key={plant.id}
//               className="shadow-lg h-[300px] w-full max-w-[300px] rounded-lg flex flex-col bg-white hover:shadow-xl transition"
//               onClick={() => navigate(`/plant/${plant.id}`)}
//             >
//               <div className="w-[80%] mx-[10%] min-h-[220px] flex items-center justify-center">
//                 <img
//                   src={plant.imageUrl || "default-image-url.jpg"}
//                   alt={plant.name}
//                   className="w-[200px] h-[220px] object-contain m-auto"
//                 />
//               </div>

//               <div className="flex flex-col justify-center p-4 flex-grow text-center">
//                 <p className="text-md font-semibold truncate">{plant.name}</p>
//                 <p className="text-green-600 text-md font-medium">
//                   {plant.categoryName}
//                 </p>
//               </div>

//               {/* <motion.button whileHover={{ scale: 1.1 }}>
//                   <RiShoppingBasket2Line className="text-3xl p-1 rounded-md text-white bg-[#5AAC38] cursor-pointer" />
//                 </motion.button> */}
//             </div>
//           ))
//         )}
//       </div>

//       {loading && <div className="text-center py-10">Loading...</div>}

//       {hasNextPage && !loading && (
//         <div className="text-center mt-8">
//           <button
//             className="text-green-600 font-semibold hover:text-green-800"
//             onClick={loadNextPage}
//           >
//             Next Page →
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlantList;
