import React from 'react'

function Table({ data }) {
    return (
        <table border={1} style={{ borderRadius: 20, overflow: "clip" }} >
            <thead>
                <th className="font-montserrat    text-xs">Date</th>
                <th className="font-montserrat    text-xs ">Account Name</th>
                <th className="font-montserrat     text-xs ">Amount</th>
                <th className="font-montserrat    text-xs ">Balance</th>
                <th className="font-montserrat   text-xs ">Narration</th>
                <th className="font-montserrat  text-xs ">Type</th>
                <th className="font-montserrat text-xs ">Status</th>
            </thead>
            <tbody>
                {/* {<Search data={bankState?.transaction?.postingsHistory}   bankState.transaction?.postingsHistory />} */}
                {data.map((item, i) => (
                    <tr key={i} onClick={() => handleRowClick(item)}>
                        <td className="font-montserrat text-xs" style={{ whiteSpace: "nowrap" }}>
                            {moment(item.realDate).format("YYYY-MM-DD")}
                        </td>

                        <td className="font-montserrat text-xs">
                            {item.beneficiaryName}
                        </td>
                        {/* <td className="font-montserrat text-xs">
            {item.accountNumber}
          </td> */}
                        <td className="font-montserrat text-xs">
                            {item.postingRecordType === postingType.credit ? (
                                <span className="text-green-600"> {Util.formAmount(item.amount, true)}</span>
                            ) : (
                                <span className="text-red-600"> {Util.formAmount(item.amount, true)}</span>
                            )}

                        </td>
                        <td className="font-montserrat text-xs">
                            {Util.formAmount(item.balanceAfter, true)}
                        </td>
                        <td className="font-montserrat text-xs">
                            {item.narration || "N/A"}
                        </td>
                        <td className="font-montserrat text-xs">
                            {item.postingRecordType === postingType.credit ? (
                                <span className="text-green-600">Credit</span>
                            ) : (
                                <span className="text-red-600">Debit</span>
                            )}
                        </td>
                        <td className="font-montserrat text-xs">
                            {bankState.getAccountTransactionStatus}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table