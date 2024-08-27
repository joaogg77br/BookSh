import { useState } from 'react'
import {Search} from 'lucide-react'
import axios from 'axios'
function App() {
    const [search,setSearch] = useState("")
    const [books,setBooks] = useState()
    const [loading,setLoading] = useState(false)
    const apiKey = "AIzaSyCVlSZlMCTL9fQsp1ylf-HyW6eyF_TwHRI"
  async function Api(){
      try{
        setLoading(true)
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}:keyes&key=${apiKey}`)
          console.log(response.data.items)
          setBooks(response.data.items || null)
      } catch(error){
        console.log("Erro ao buscar livros",error)
      }finally{
        setLoading(false);
      }

    }

    if(loading){
      return <li className='text-2xl font-bold'>Loading...</li>
    }
  return (
    <>
    <div className='p-4 font-bold text-2xl text-cyan-400'>
      BookSh
    </div>
    <main className='flex flex-col justify-center'>
    <div className='flex justify-center'>
      <div className='flex justify-between p-2 w-1/2 border-2 rounded border-black'>
        <input type="text" onChange={(e) => { setSearch(e.target.value)  }} value={search}  className='outline-none w-full'/>
        <Search onClick={Api}/>
      </div>
    </div>

    <div className='grid grid-cols-5 flex-col gap-10 p-10'>
      {books ?
        books.map(  (book,index)=>{
            const img = book.volumeInfo.imageLinks?.smallThumbnail || 'https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png'
            const title = book.volumeInfo.title
            return(
              <div key={index} className='flex flex-col items-center font-semibold'>
                <img src={`${img}`} alt="" className='h-40 w-40 rounded'/>
                <div>{title}</div>
                <div>{}</div>
              </div>
            )
        })
        : 
        <div>
          Not found
        </div>
      }
    </div>
    </main>
    </>
  )
}

export default App
