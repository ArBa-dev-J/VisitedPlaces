import { Link } from 'react-router';

function PageHeader() {
    return (
        <>
            <header className='flex flex-col items-center pt-10 '>
                <Link to="/"><h1 className='bg-yellow-200 text-center hover:bg-yellow-300 p-2 rounded-[20px] text-[1.5rem]'>Your Visited Places</h1></Link>

                <nav className='mt-20 flex justify-center  py-4'>
                    <div className='relative right-20'>
                        <Link to="/newPlace" className='mr-2 p-2 relative right-15 bg-white hover:bg-gray-200 rounded-[20px] text-[1.2rem]'>
                            Add a new visited place
                        </Link>

                        <Link className='ml-2 p-2 relative right-15 bg-white hover:bg-gray-200 rounded-[20px] text-[1.2rem]'>
                            Visited place list
                        </Link>
                    </div>

                    <div>
                        <Link to="/newCity" className='mr-2 p-2 bg-white hover:bg-gray-200 rounded-[20px] text-[1.2rem]'>
                            Add a new city
                        </Link>

                        <Link to="/cityList" className='ml-2 p-2 bg-white hover:bg-gray-200 rounded-[20px] text-[1.2rem]'>
                            City list
                        </Link>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default PageHeader;