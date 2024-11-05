import {BrowserRouter,Routes,Route} from 'react-router-dom'
import BoardDetails from '../pages/BoardDetails'
import Boards from '../pages/Boards'


const Router = ()=>{
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element = {<Boards />} />
            <Route path='/boards/:boardId' element = {<BoardDetails />} />
            <Route path='*' element = {<h2>This route does not exist</h2>} />
        </Routes>
        </BrowserRouter>
    )
}
export default Router