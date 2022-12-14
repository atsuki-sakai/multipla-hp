import Link from 'next/link';

interface Props {
    totalCount: number
    pageIndex: number
    perPage: number
    path: string
}

const Pagination = ({ totalCount, pageIndex, perPage, path }: Props) => {

    const range = (start: number, end: number) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

    return (
        <div className='flex justify-center'>
            <div className='flex items-center justify-center space-x-3'>
                {
                    range(1, Math.ceil(totalCount / perPage)).map((number, index) => (
                        <div key={index}>
                            <Link href={` ${path}/${number} `}>
                                <a className={`font-bold text-base md:text-lg ${number == pageIndex ? "bg-gradient-to-tl to-green-400 from-lime-500  text-white shadow-md text-2xl md:text-3xl px-3 py-2 rounded-md" : "text-gray-500 bg-gray-200 shadow-inner shadow-gray-300 px-2 py-1 rounded-md "}`}>{number}</a>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Pagination