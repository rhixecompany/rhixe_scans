const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1220px] pt-2 overflow-hidden m-auto pb-[3rem] relative">
      {children}
    </div>
  )
}

export default MainLayout
