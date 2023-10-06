import React , { useEffect, useState } from 'react';
import "./ListFilter.css"
import { Base_Url } from '../API';


function ListFilter ({selectedTags , setSelectedTags}){

    const [searchTerm, setSearchTerm] = useState("");
    const [AllTags, setAllTags] = useState([]);
   
    
    useEffect(() => {
        try{
            fetch(Base_Url + 'alltags/')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data.tags);
                    setAllTags(data.tags);
                })
            .catch(error => {
                console.error('Fetch error:', error);
            });
        }catch(error){
            console.log(error)
        }
    }, []);
    

    const updateSelectedTags = (item) => {
        if (!selectedTags.includes(item)) {
            setSelectedTags([...selectedTags, item]);
        }
        setSearchTerm("");
    }

    const removeSelectedTags = (item) => {
        setSelectedTags(selectedTags.filter(tag => tag !== item));
    }

 return (
   <div className='listfilter' > 

        <div className='selectedtags' >
            {selectedTags.map(item => (
                <div className='tag-conatiner' key={item.id}>
                    <p>{item.name}</p>
                    <p onClick={() => removeSelectedTags(item) }>X</p>
                </div>
            ))}
        </div>
        
        <div className='input-container'>
            <input 
                onChange={(e) => setSearchTerm(e.target.value)} 
                value={searchTerm}
                placeholder='Search for tags'
            ></input>
            <button>Search</button>
        </div>
    
        
        { searchTerm === "" ? null :
        <ul className='tagslist'>
            {AllTags.filter(
                item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map
                (item => (
                    <li 
                        key={item.id}
                        className='tag'
                        onClick={() => updateSelectedTags(item)}     
                    ><p>{item.name}</p></li>
                ))}
        </ul>
        }
        
   </div>
 )
}

export default ListFilter;