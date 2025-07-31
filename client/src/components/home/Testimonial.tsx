import { testimonials } from "../../data/testimonials"
import { RiStarSFill } from "react-icons/ri"

const Testimonial = () => {
    return(
        <div className="grid-responsive mt-8">
            {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex flex-col gap-4 bg-[var(--primary)] text-[var(--background)] p-6 rounded-xl">
                    <blockquote className="text-left">
                        <p className="text-lg italic">
                            "{testimonial.message}"
                        </p>
                    </blockquote>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                        <div className="flex items-center gap-4">
                            <img src={testimonial.imgSrc} alt={testimonial.author} className="w-12 h-12 object-cover rounded-full" loading="lazy"/>
                            <p className="font-medium">{testimonial.author}</p>
                        </div>
                        <div className="flex items-center">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                <RiStarSFill key={i} className="text-yellow-400" />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Testimonial