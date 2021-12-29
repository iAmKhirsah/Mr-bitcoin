export function Transactions({ loggedInUser, contact }) {
  loggedInUser.transactions.sort((a, b) => {
    return b.at - a.at;
  });
  let transactions = loggedInUser.transactions;
  if (contact) {
    transactions = loggedInUser.transactions.filter(
      (trans) => trans.toId === contact._id
    );
  }
  if (!loggedInUser) return <div>Loading...</div>;
  return (
    <div>
      {transactions.slice(0, 3).map((transaction) => (
        <div key={transaction.at}>
          <p>
            Transfer to {transaction.to} to the amount of {transaction.amount}{' '}
            BTC at {new Date(transaction.at).toLocaleDateString('en-GB')}
          </p>
        </div>
      ))}
    </div>
  );
}
