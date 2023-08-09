import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components';
import { X } from '@styled-icons/bootstrap/X';
import customApi from '@utils/customApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DeleteModal from '@components/modal/DeleteModal';
import { GET_PROJECTS } from '@utils/queryKeys';

interface ProjectsListProps{
  projects : {
    title : string
    link : string
    id : number
  }[]
}

const ProjectList = ({projects} : ProjectsListProps) => {
  const queryClient = useQueryClient();

  const [currentDeleteId, setCurrentDeleteId] = useState(-1);
  
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const {deleteApi} = customApi('/banner/deleteProject')
  const {mutate} = useMutation(deleteApi,{
    onError(error, variables, context) {
        console.log({error})
    },
    onSuccess(data, variables, context) {
        console.log({data})
        queryClient.invalidateQueries([GET_PROJECTS])
    },
  })

  const handleDeleteModal = (id :number) => ()=>{
    setIsOpenDeleteModal(true)
    setCurrentDeleteId(id)
  }

  const handleDeleteMutate = ()=>{
    mutate({id: currentDeleteId})
    setCurrentDeleteId(-1);
  }



  return (
    <ProjectListArea>
      <ProjectListTitle>
        프로젝트 목록
      </ProjectListTitle>
      {projects?.length > 0 || <EmptyDataText>아직 안 만들었나봐요..</EmptyDataText>}
      <ProjectListBox>
        {projects?.length > 0 && projects.map(({title, id}) =>(
          <ProjectItem>
            <p>{title}</p>
            <DeleteBox>
              <DeleteBtn type='button' onClick={handleDeleteModal(id)}>
                <span className='blind'>삭제</span>
                <X/>
              </DeleteBtn>
            </DeleteBox>
            {isOpenDeleteModal && (currentDeleteId === id) && <DeleteModal mutate={handleDeleteMutate} onClose={()=> setIsOpenDeleteModal(false)} />}
          </ProjectItem>
        ))}
      </ProjectListBox>
    </ProjectListArea>
  )
}

export default ProjectList

const EmptyDataText=styled.div`
  text-align:center;
  padding: 20px 0;
`

const ProjectListTitle = styled.h3`
  padding: 10px 0 15px;
  margin-bottom: 15px;
  text-align:center;
  border-bottom: 1px solid rgba(128,128,128,.3);
`
const ProjectListBox = styled(OnlyAlignCenterFlex)`
flex-wrap: wrap;
justify-content:space-between;
row-gap :10px;
`



const ProjectListArea = styled.div`
  margin: 40px 0;
`

const ProjectItem = styled.div`
  display:flex;
  width: 48%;
  min-height: 50px;
  border: 1px solid rgba(128,128,128,.3);
  border-radius: 2px;
  overflow:hidden;
  p{
    margin: auto;
    width: calc(100% - 30px);
    height:100%;
    text-align:center;
    line-height: 20px;
  }
`
const DeleteBox =styled.div`
`

const DeleteBtn =styled.button`
  display:flex;
  align-items:center;
  width:30px;
  height:100%;
  background: #ff8989;
  transition: .2s;
  padding: 2px;
  svg{
    width:100%;
    color:#fff;
  }
  &:hover{
    background :${({theme}) => theme.color.err};
  }
`