import { OnlyAlignCenterFlex } from '@components/common/CommonFlex';
import React from 'react'
import styled, { keyframes } from 'styled-components';

const BoardItem = () => {
  const test = `
  <p>테스트</p>
    <p>테스트</p>
    <p>테스트</p>
    <p>테스트</p>
    <p>테스트</p>
    <p>테스트</p>
    <p>테스트</p>
    <p>테스트</p>
    <p>테스트</p>
    <p>테스트</p>
    <p>테dsadasd스트</p>
    <p>테스트</p> <p>테스트</p>
    <p>테스트</p>
    <p>테스트</p>
    <p>테스트dsadsa</p>
    <p>테스트</p>
    <p>테스트</p> <p>테스트</p>
    <p>테스트</p>
    <p>테스트</p>
    <p>테스트</p>
    <p>테스트</p>
    <p>테스트</p> <p>테스트</p>
    <p>테스트</p>
    <p>테스트</p>
    <p>테dsada스트</p>
    <p>테스트</p>
    <p>테스트</p> <p>테스트</p>
    <p>테스트</p>
    <p>테스트</p>
    <p>테스트</p>
    <p>테스트</p>
    <p>테dsadsas스트</p> <p>테스트</p>
    <p>테스트</p>
   
    `
  return (
    <ItemWrap>
      <ContentsBox>
        <ItemCategory>
          <span>
            JavaScript
          </span>
        </ItemCategory>
        <ItemTitleBox>
          <p>어쩌구 저쩌구</p>
        </ItemTitleBox>
        <ItemDescBox>
          {/* splice 해서 ... 찍던지 해야할듯 */}
          {test.replace(/(<([^>]+)>)/gi, '')}
        </ItemDescBox>
        <ItemDetailBox>
          <ItemAuthorBox>
            <AuthorImageBox>

            </AuthorImageBox>
            <span>관리자</span>
          </ItemAuthorBox>
          <CreatedDateBox>
            2023.07.05
          </CreatedDateBox>
        </ItemDetailBox>
      </ContentsBox>
      <ImageBox></ImageBox>
    </ItemWrap>
  )
}

export default BoardItem

const ItemWrap = styled(OnlyAlignCenterFlex)`
  padding: 40px 30px;
  border : 1px solid #fff;
  column-gap: 30px;
`
const ContentsBox =styled.div`
  flex: 1;

`
const ItemCategory =styled.div`
margin-bottom: 24px;
span{
  font-size : 12px;
  background: #75C2F6;
  display:inline-block;
  padding: 10px 15px;
  border-radius: 20px;
}
`
const ItemTitleBox =styled.div`
font-size : 20px;
margin-bottom : 24px;
p{
  white-space : nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`
const ItemDescBox =styled.div`
  line-height: 20px;
  font-size : 14px;
  margin-bottom: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  word-break: keep-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; 
`
const ItemDetailBox =styled(OnlyAlignCenterFlex)`
  font-size: 14px;
`
const ItemAuthorBox =styled(OnlyAlignCenterFlex)`
  margin-right: 20px;
`
const AuthorImageBox= styled.div`
  width: 30px;
  height: 30px;
  border : 1px solid #fff;
  margin-right: 10px;
`

const CreatedDateBox = styled.div`


`





const ImageBox = styled.div`
  width: 168px;
  height: 168px;
  border : 1px solid #fff;
  
`