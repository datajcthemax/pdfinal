import BalanceSheet from './BalanceSheet';
import CashFlow from './CashFlow';
import FinancialStatement from './FinancialStatement';

function FinancialTab({ activeTab, setActiveTab, balanceSheetData, cashFlowData, financialStatementData }) {
    return (
        <div>
            <div className="tabs">
                <button onClick={() => setActiveTab('bs')} className={activeTab === 'bs' ? 'active-tab' : ''}>Balance Sheet</button>
                <button onClick={() => setActiveTab('cf')} className={activeTab === 'cf' ? 'active-tab' : ''}>Cash Flow</button>
                <button onClick={() => setActiveTab('fs')} className={activeTab === 'fs' ? 'active-tab' : ''}>Financial Statement</button>
            </div>

            {activeTab === 'bs' && <BalanceSheet data={balanceSheetData} />}
            {activeTab === 'cf' && <CashFlow data={cashFlowData} />}
            {activeTab === 'fs' && <FinancialStatement data={financialStatementData} />}
        </div>
    );
}

export default FinancialTab;
