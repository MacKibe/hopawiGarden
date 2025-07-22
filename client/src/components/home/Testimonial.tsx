import { testimonials } from "../../data/testimonials"
import { RiStarSFill } from "react-icons/ri";
const Testimonial = () => {
    return(
        <div className="grid grid-cols-3 gap-8 ">
            {testimonials.map((testimonial, index)=>(
                <div className="flex flex-col gap-2 bg-[var(--secondary)] text-[var(--background)] p-8 rounded-2xl" key={index}>
                    <div>
                        <p>
                            <b className="text-2xl">" </b> 
                            {testimonial.message}
                            <b className="text-2xl"> "</b>
                        </p>
                    </div>
                    <div className="flex justify-around items-center">
                        <div className="flex items-center my-2">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                <RiStarSFill key={i} className="text-yellow-400" />
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <img src={testimonial.imgSrc} alt={testimonial.author} className="w-10 h-10 object-cover rounded-full"/>
                        <p>{testimonial.author}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Testimonial