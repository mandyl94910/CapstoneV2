

export default function Footer(){

    return(
        <div>
            <hr className="border-gray-300 mt-6" />
            <div className="flex gap-20 h-52 pt-6 pl-20">
            <div className="text-gray-800 text-sm">
                <h2 className="text-lg font-bold mb-1">Contact Us</h2>
                <p>Email: aaa@gmail.com</p>
                <p>Phone: 1587-123-4567</p>
                <p>Address: 123 street NW City Prov</p>
                <button className=" bg-blue-500 text-white text-base mt-2 px-3 py-1 rounded-lg hover:bg-blue-600">Contact Us</button>
            </div>
            <div className="text-gray-800 text-sm">
                <h2 className="text-lg font-bold mb-1">Customer Support</h2>
                <p>Refund policy</p>
                <p>private policy</p>
                <p>Refund policy</p>
                <p>Refund policy</p>
            </div>
        </div>
        </div>
       
    );
}