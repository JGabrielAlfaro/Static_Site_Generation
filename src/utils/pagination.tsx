

const isNumeric = (str: string) => /^\d+$/.test(str);

export const getPagination =  ( items:any, postPerPage = 2, currentPage  = "1" ) => {

    if (! isNumeric(currentPage)) {
        throw new Error("Not a number")
      }

      const currentPageInt = parseInt(currentPage)
      const totalPosts = items.length ;
      const totalPages = Math.ceil(totalPosts / postPerPage);
      if (currentPageInt > totalPages){
          throw new Error (`Page ${currentPageInt} does not exist`)
      }
      
    const offset = (currentPageInt - 1) * postPerPage;
    const currentPosts = items.slice(offset, offset + postPerPage);
    
  
    return {
        currentPosts,
        totalPages
    }
};
