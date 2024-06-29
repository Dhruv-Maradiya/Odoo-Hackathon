import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExamById } from 'src/store/exam/exam'
import ExamsView from 'src/views/exam'
import ExamSingleView from 'src/views/exam/ExamSingleView'

const ExamPage = () => {
  const {
    query: { id }
  } = useRouter()

  const dispatch = useDispatch()

  const { exam } = useSelector(state => state.exam)

  useEffect(() => {
    if (id) {
      dispatch(fetchExamById({ id }))
    }
  }, [dispatch, id])

  return <ExamSingleView id={id} data={exam} />
}

export default ExamPage
