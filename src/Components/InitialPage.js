import axios from 'axios'
import React, {useState } from 'react'

function InitialPage() {
    const apikey='AIzaSyC6I8kCMFaAXh5zDi3EwcNz-R4YUIniFIA'
    const[search,setSearch]=useState('')
    const[searchresult,setSearchresult]=useState([])
    const[values,setValues]=useState(null)
    function handleSubmit(e){
        e.preventDefault()
        axios(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${apikey}&maxResults=20`)
        .then(res=>{
            setSearchresult(res.data.items)
            // console.log(res.data.items);
    
    })
        .catch(error=>console.log(error))
    }
    function mouseOver(id){
        [...searchresult].filter((data)=>{
        if(data.id===id){
            setValues(id)
        }
        return null;
      })
    }
    function mouseOut(id){
        setValues(null)
    }
  return (
    <div>
        <header id='heading'>
      <h1>BOOK SEARCH</h1>
      </header>
      <input type="text" id="search-box" value={search} onChange={e=>setSearch(e.target.value)} placeholder='Search for book'/>
        <button onClick={(e)=>handleSubmit(e)}>Search</button>   
        <div id="books">
            {searchresult.map((item,index)=>{
                // console.log(item.volumeInfo.infoLink);
                const image=item.volumeInfo.imageLinks.thumbnail;
                return <a href={item.volumeInfo.infoLink} id="image" onMouseOver={()=>mouseOver(item.id)} onMouseOut={()=>mouseOut(item.id)} style={{backgroundImage:'url('+image+')'}} key={index} rel="noreferrer" target='_blank'>
                        {values===item.id&&<div>
                            <span>Title : {item.volumeInfo.title}</span><br/>
                            <span>Authors : {item.volumeInfo.authors}</span><br/>
                            <span>PageCount : {item.volumeInfo.pageCount}</span><br/>
                            { item.volumeInfo.ratingsCount===undefined?
                            <span>Rating : Not found</span>:
                            <span>Rating : {item.volumeInfo.ratingsCount}</span>
                            }
                            </div>}
                           
                 </a>
                
            })}
         </div>   
 

    </div>
  )
}

export default InitialPage
