import React, { useState } from 'react'
const keys = ['Date', "Account Name", "Amount", "Balance", "Narration", "Type", "Status"]
console.log()
function Search(data: any) {
    const [query, setQuery] = useState("")
    return data.filter((item: any) => keys.some(key => item[key].toLowerCase().include(query)))



}

export default Search