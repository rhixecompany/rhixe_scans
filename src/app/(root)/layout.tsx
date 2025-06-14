import Footerbar from "@/components/Footerbar"
import Navbar from "@/components/Navbar"
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="max-w-[1220px] pt-2 overflow-hidden m-auto pb-[9rem] relative">
        <div className="w-[100%]">
          <div className="lg:my-0 relative max-[786px]:p-0 max-[882px]:p-4 min[925px]:p-0">
            {children}
          </div>
        </div>
      </div>

      <Footerbar />
    </>
  )
}

export default MainLayout
