import React from 'react'
import BoardCreatingForm from '../components/BoardCreatingForm'
import BoardList from '../components/BoardList'
// import { BoardContext } from '../contexts/Board'

const Boards = () => {
  return (
    <>
    <BoardCreatingForm />
    <BoardList />
    </>
  )
}

export default Boards