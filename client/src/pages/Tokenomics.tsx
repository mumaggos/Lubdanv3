import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Supply Distribution Data
const supplyDistribution = [
  { name: 'Presale', value: 45, tokens: 9450000, color: '#8B5CF6' },
  { name: 'Liquidity Launch', value: 35, tokens: 7350000, color: '#3B82F6' },
  { name: 'Ecosystem & Development', value: 10, tokens: 2100000, color: '#10B981' },
  { name: 'Marketing', value: 5, tokens: 1050000, color: '#F59E0B' },
  { name: 'Team', value: 4, tokens: 840000, color: '#EF4444' },
  { name: 'Airdrops', value: 1, tokens: 210000, color: '#8B5CF6' },
];

// Casino Revenue Distribution Data
const casinoRevenue = [
  { name: 'LBD Holders', value: 50, color: '#8B5CF6' },
  { name: 'Development & Operations', value: 30, color: '#3B82F6' },
  { name: 'Marketing & Ecosystem', value: 20, color: '#10B981' },
];

export default function Tokenomics() {
  const { t } = useLanguage();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-semibold">{payload[0].name}</p>
          <p className="text-primary">{payload[0].value}%</p>
          {payload[0].payload.tokens && (
            <p className="text-muted-foreground text-sm">
              {payload[0].payload.tokens.toLocaleString()} LBD
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-foreground">
              {t('tokenomics.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('tokenomics.subtitle')}
            </p>
          </motion.div>

          {/* Overview Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-foreground">
                {t('tokenomics.overview.title')}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-border pb-3">
                    <span className="text-muted-foreground">{t('tokenomics.overview.total_supply')}</span>
                    <span className="text-foreground font-bold text-lg">21,000,000 LBD</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border pb-3">
                    <span className="text-muted-foreground">{t('tokenomics.overview.network')}</span>
                    <span className="text-foreground font-semibold">Polygon (ERC-20)</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border pb-3">
                    <span className="text-muted-foreground">{t('tokenomics.overview.minting')}</span>
                    <span className="text-red-500 font-semibold">{t('tokenomics.overview.no')}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-border pb-3">
                    <span className="text-muted-foreground">{t('tokenomics.overview.burn')}</span>
                    <span className="text-red-500 font-semibold">{t('tokenomics.overview.no')}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border pb-3">
                    <span className="text-muted-foreground">{t('tokenomics.overview.type')}</span>
                    <span className="text-foreground font-semibold">{t('tokenomics.overview.fixed_supply')}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Supply Distribution Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-foreground text-center">
                {t('tokenomics.distribution.title')}
              </h2>
              
              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Pie Chart */}
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">
                    {t('tokenomics.distribution.pie_title')}
                  </h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={supplyDistribution}
                        cx="50%"
                        cy="45%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {supplyDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        formatter={(value, entry: any) => `${entry.payload.name}: ${entry.payload.value}%`}
                        wrapperStyle={{ fontSize: '12px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">
                    {t('tokenomics.distribution.bar_title')}
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={supplyDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                      <YAxis tick={{ fill: '#888' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" fill="#8B5CF6">
                        {supplyDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Distribution Details */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {supplyDistribution.map((item, index) => (
                  <div key={index} className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <h4 className="font-semibold text-foreground">{item.name}</h4>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-1">{item.value}%</p>
                    <p className="text-sm text-muted-foreground">{item.tokens.toLocaleString()} LBD</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Presale Phases Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-foreground text-center">
                {t('tokenomics.presale.title')}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Phase 1 */}
                <div className="bg-primary/10 backdrop-blur-sm rounded-lg p-6 border border-primary/30">
                  <h3 className="text-xl font-bold text-primary mb-4">{t('tokenomics.presale.phase1.title')}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('tokenomics.presale.price')}</span>
                      <span className="text-foreground font-bold">$0.20</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('tokenomics.presale.allocation')}</span>
                      <span className="text-foreground font-bold">6,300,000 LBD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('tokenomics.presale.percentage')}</span>
                      <span className="text-foreground font-bold">30%</span>
                    </div>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="bg-secondary/10 backdrop-blur-sm rounded-lg p-6 border border-secondary/30">
                  <h3 className="text-xl font-bold text-secondary mb-4">{t('tokenomics.presale.phase2.title')}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('tokenomics.presale.price')}</span>
                      <span className="text-foreground font-bold">$0.60</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('tokenomics.presale.allocation')}</span>
                      <span className="text-foreground font-bold">3,150,000 LBD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('tokenomics.presale.percentage')}</span>
                      <span className="text-foreground font-bold">15%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-background/50 backdrop-blur-sm rounded-lg border border-border">
                <p className="text-sm text-muted-foreground text-center">
                  {t('tokenomics.presale.note')}
                </p>
              </div>
            </div>
          </motion.section>

          {/* Casino Revenue Distribution Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-foreground text-center">
                {t('tokenomics.casino.title')}
              </h2>
              <p className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
                {t('tokenomics.casino.description')}
              </p>

              {/* Casino Revenue Pie Chart */}
              <div className="flex flex-col items-center mb-8">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={casinoRevenue}
                      cx="50%"
                      cy="45%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {casinoRevenue.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      formatter={(value, entry: any) => `${entry.payload.name}: ${entry.payload.value}%`}
                      wrapperStyle={{ fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Revenue Distribution Details */}
              <div className="grid md:grid-cols-3 gap-4">
                {casinoRevenue.map((item, index) => (
                  <div key={index} className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-border text-center">
                    <div className="w-8 h-8 rounded-full mx-auto mb-3" style={{ backgroundColor: item.color }}></div>
                    <h4 className="font-semibold text-foreground mb-2">{item.name}</h4>
                    <p className="text-3xl font-bold text-primary">{item.value}%</p>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <div className="mt-8 p-6 bg-yellow-500/10 backdrop-blur-sm rounded-lg border border-yellow-500/30">
                <p className="text-sm text-muted-foreground text-center">
                  {t('tokenomics.casino.disclaimer')}
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
}
