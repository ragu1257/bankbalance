import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'

const HomePage = async ({searchParams : {id, page}}: SearchParamProps) => {
    const currentPage = Number(page as string) || 1
    const loggedIn = await getLoggedInUser()
    let accounts;
    if (loggedIn) {
         accounts = await getAccounts({ userId: loggedIn.$id })
        if(!accounts) return;
    }

    const appwriteItemId = (id as string) || accounts.data[0].appwriteItemId
    const account = await getAccount({ appwriteItemId })
    
    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.firstName || 'Guest'}
                        subtext="Access and manage your account"
                    />
                    <TotalBalanceBox
                        accounts={accounts.data}
                        totalBanks={accounts.totalBanks}
                        totalCurrentBalance={accounts.totalCurrentBalance}
                    />
                </header>
                <RecentTransactions
                accounts={accounts.data}
                transactions={account.transactions}
                appwriteItemId={appwriteItemId}
                page={currentPage}
                />
            </div>
            <RightSidebar
                user={loggedIn}
                transactions={accounts.transactions}
                banks={accounts.data.slice(0, 3)}
            />
        </section>
    )
}
export default HomePage