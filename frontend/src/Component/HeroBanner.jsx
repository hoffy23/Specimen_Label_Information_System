/**
 * Author: Menachem H
 * 
 * HeroBanner component renders a hero section with a company logo,
 * agency name, and staff name.
 *
 * @component
 * @example
 * return (
 *   <HeroBanner />
 * )
 */
const HeroBanner = () =>{
  
  return (
    <div className='container-hero'>
        <img id="comapany-logo" src="/assets/NSW-ONLY-nsw-government-logo.svg" width="280" height="280"/>
        
        <h2 id="agency-name">Agency for <br></br>Clinical Innovation</h2>
        <h3 id="staff-name">Staff Name</h3>
    </div>
  )
}
export default HeroBanner;