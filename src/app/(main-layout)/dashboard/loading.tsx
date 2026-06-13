import React from 'react'
import PageHeaderSkeleton from '@/components/skeletons/PageHeaderSkeleton';
import CardSkeleton from '@/components/skeletons/CardSkeleton';

const DashboardLoader = () => {
  return (
    <div className='w-full flex flex-col gap-6'>
        <PageHeaderSkeleton />
        <div className="px-4 flex flex-col gap-6 mb-4">
          <CardSkeleton count={4} />
          <CardSkeleton 
            count={4} 
            containerClassName='grid grid-cols-1 lg:grid-cols-2'
            cardClassName='h-80'
          />
          <CardSkeleton 
            count={1} 
            cardClassName='h-80'
          />
        </div>
    </div>
  )
};

export default DashboardLoader;