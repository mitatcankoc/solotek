import LogoSlider1 from "@/components/slider/LogoSlider1"


export default function Logo() {
    return (
        <>
            <div className="logo-area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <div className="heading text-center">
                                <h5>Trusted by more than 400+ companies worldwide</h5>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <LogoSlider1 />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
