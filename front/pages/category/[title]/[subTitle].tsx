import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styled,{keyframes} from 'styled-components';
import type { NextPage } from 'next';
import useIsMount from 'src/hooks/useIsMount';

const SubCategoryPage: NextPage = () => {
  const router = useRouter();
  const {isMount} = useIsMount();

  return (
    <div>{isMount && router.query.title + '/' + router.query.subTitle}</div>
  )
}

export default SubCategoryPage