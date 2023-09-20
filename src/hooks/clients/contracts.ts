
import {
  Cw20TokenContract as JunoCw20TokenContract,
  Cw20TokenQueryContract as JunoCw20TokenQueryContract
} from "./juno/Cw20Token";
import {
  Cw20TokenContract as OsmosisCw20TokenContract,
  Cw20TokenQueryContract as OsmosisCw20TokenQueryContract
} from "./osmosis/Cw20Token";

import {
  MarsRedBankContract as OsmosisMarsRedBankContract,
  MarsRedBankQueryContract as OsmosisMarsRedBankQueryContract
} from "./osmosis/RedBank";
import {
  MarsAdapterContract as OsmosisMarsAdapterContract,
  MarsAdapterQueryContract as OsmosisMarsAdapterQueryContract
} from "./osmosis/MarsAdapterContract";

import {
  SplitterContract as OsmosisSplitterContract,
  SplitterQueryContract as OsmosisSplitterQueryContract
} from "./osmosis/SplitterContract";
import {
  MarketContract as OsmosisMarketContract,
  MarketQueryContract as OsmosisMarketQueryContract
} from "./osmosis/MarketContract";

export const RedBankQueryContract: Record<string, any> = {
  'OsmosisTestnet': OsmosisMarsRedBankQueryContract,
  'OsmosisMainnet': OsmosisMarsRedBankQueryContract,
};
export const RedBankContract: Record<string, any> = {
  'OsmosisTestnet': OsmosisMarsRedBankContract,
  'OsmosisMainnet': OsmosisMarsRedBankContract,
};

export const MarsAdapterQueryContract: Record<string, any> = {
  'OsmosisTestnet': OsmosisMarsAdapterQueryContract,
  'OsmosisMainnet': OsmosisMarsAdapterQueryContract,
};
export const MarsAdapterContract: Record<string, any> = {
  'OsmosisTestnet': OsmosisMarsAdapterContract,
  'OsmosisMainnet': OsmosisMarsAdapterContract,
};

export const SplitterQueryContract: Record<string, any> = {
  'OsmosisTestnet': OsmosisSplitterQueryContract,
  'OsmosisMainnet': OsmosisSplitterQueryContract,
};
export const SplitterContract: Record<string, any> = {
  'OsmosisTestnet': OsmosisSplitterContract,
  'OsmosisMainnet': OsmosisSplitterContract,
};

export const MarketQueryContract: Record<string, any> = {
  'OsmosisTestnet': OsmosisMarketQueryContract,
  'OsmosisMainnet': OsmosisMarketQueryContract,
};
export const MarketContract: Record<string, any> = {
  'OsmosisTestnet': OsmosisMarketContract,
  'OsmosisMainnet': OsmosisMarketContract,
};

export const Cw20TokenQueryContract: Record<string, any> = {
  'JunoMainnet': JunoCw20TokenQueryContract,
  'JunoTestnet': JunoCw20TokenQueryContract,
  'OsmosisTestnet': OsmosisCw20TokenQueryContract,
  'OsmosisMainnet': OsmosisCw20TokenQueryContract,
};
export const Cw20TokenContract: Record<string, any> = {
  'JunoMainnet': JunoCw20TokenContract,
  'JunoTestnet': JunoCw20TokenContract,
  'OsmosisTestnet': OsmosisCw20TokenContract,
  'OsmosisMainnet': OsmosisCw20TokenContract,
};
