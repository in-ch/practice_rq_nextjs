import type { NextPage } from 'next'
import { useRef } from 'react'
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import styled from '@emotion/styled';

import { getSuperhero } from '../services/superhero'

const Container = styled.div`
width:100%;
height:1000px;
  background-color:red;
`;

const Home: NextPage = () => {
  const { data: superheros, fetchNextPage, hasNextPage } = useInfiniteQuery('superhero', 
    () => getSuperhero({_start:0, _end:10}), 
    {
      getNextPageParam: (lastPage) => {
        console.log(lastPage);
      },
      staleTime: 1000,
    }
  )

  const loadMoreButtonRef = useRef<HTMLInputElement>(null);

  useIntersectionObserver({
    root: null,
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: Boolean(hasNextPage),
  })

  return (
    <Container>
      <>
        {superheros && superheros?.pages?.map((superhero)=>{

            return (
              <div key={`key-${superhero.id}`}>
                <p style={{fontSize:20, color: 'blue'}}>{superhero?.id}</p>
              </div>
            );
        })}
        <div ref={loadMoreButtonRef} />
      </>
    </Container>
  )
}

// export async function getServerSideProps() {
//   const queryClient = new QueryClient()

//   await queryClient.prefetchInfiniteQuery('superhero', () => getSuperhero({_start:0, _end:10}), { staleTime: 1000 })

//   return {
//     props: {
//       dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//     }
//   }
// }


export default Home
