
export const BASE_ENERGY_RATE = 0.2703;
export const HIGH_USAGE_PENALTY = 0.10;
export const CAPACITY_RATE = 0.0455;
export const NETWORK_RATE = 0.1285;
export const RETAIL_THRESHOLD = 600;
export const RETAIL_CHARGE_AMOUNT = 10.00;
export const SST_THRESHOLD_KWH = 600;
export const SST_RATE = 0.08; // 8%
export const KWTBB_RATE = 0.016; // 1.6%

export const MINIMUM_MONTHLY_CHARGE = 3.00;

export const PANEL_WATTAGE = 620;
export const PEAK_SUN_HOURS = 3.4;
export const MORNING_USAGE_PERCENT = 0.30; // 30% direct consumption

export const SYSTEM_PRICES: Record<number, number> = {
    8: 18540, 9: 19579, 10: 20619, 11: 23333, 12: 24385, 13: 25532, 14: 27230,
    15: 28258, 16: 29994, 17: 31040, 18: 32321, 19: 35027, 20: 36414, 21: 37541,
    22: 38684, 23: 39719, 24: 40761, 25: 41775, 26: 42988, 27: 44012, 28: 45037,
    29: 46106, 30: 47129, 31: 49092, 32: 50610, 33: 51640, 34: 52698, 35: 53731,
    36: 54765, 37: 55803, 38: 56845, 39: 58268, 40: 59307, 41: 60355, 42: 61385,
    43: 62422, 44: 63463, 45: 64499, 46: 65535, 47: 66577, 48: 67618
};
