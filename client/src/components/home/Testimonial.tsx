import img from "../../assets/img.jpg"
const Testimonial = () => {
    return(
        <div className="flex flex-col gap-4 bg-[var(--primary)] text-[var(--background)] p-8 rounded-2xl">
            {/* Ratings */}
            <div> 5 Stars</div>
            {/* Message */}
            <div>
                <p>"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit quis iure ea nihil modi"</p>
            </div>
            <div className="flex justify-end gap-4 items-center">
                <img src={img} alt="" className="w-10 h-10 object-cover rounded-full"/>
                <p>Mr. Michael</p>
            </div>
        </div>
    )
}

export default Testimonial