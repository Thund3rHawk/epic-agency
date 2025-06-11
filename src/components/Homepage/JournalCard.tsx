'use client'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { JournalConents } from '@/constants/Journal';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Link from 'next/link';
import useColorCtx from '@/hooks/useColorCtx';

const JournalCard = () => {
  const {textColor} = useColorCtx();

  return (
    <div className='w-[30%]'>
        <div className='flex justify-between border-b py-3' style={{borderBottomColor: textColor}}>
            <h1 className='uppercase text-xs'>Journal</h1>
            <button className='uppercase text-xs hover:bg-black hover:text-white hover:rounded-full'>See All <span><ArrowForwardIcon/></span></button>
        </div>
        <div className='flex flex-col'>
            {
              JournalConents.map((_, index)=>{
                return (
                  <div key= {index} className='flex justify-between border-b py-3 px-1' style={{borderBottomColor: textColor}}>
                      <div className='flex flex-col gap-4'>
                        <p>{_.date}</p>
                        <p>{_.title}</p>
                      </div>
                      <Link href= {_.link} className='flex flex-col items-center justify-center'>
                        <RemoveRedEyeIcon className='h-10 w-10'/>
                        <p className='uppercase text-xs'>Read</p>
                      </Link>
                  </div>
                )
              })
            }
        </div>
        
    </div>
  )
}

export default JournalCard