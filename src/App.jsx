import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Copy, 
  Trash2, 
  CheckCircle2, 
  MapPin, 
  Phone,
  ArrowDownWideNarrow,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';

// --- 全量数据录入 (Based on 15/12/2025 List) ---
const RAW_DATA = [
  // 1. Frozen Chicken
  { cat: "1. Frozen Chicken", name: "CHICKEN WHOLE LEG (JUMBO)", cn: "鸡全腿", pack: "15KG", origin: "BRAZIL", price: 2.80, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN WHOLE LEG (210G-240G)", cn: "鸡全腿(小)", pack: "3.5KG", origin: "DENMARK", price: 5.00, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN WHOLE LEG (280-310G)", cn: "鸡全腿", pack: "13.61KG", origin: "USA", price: 3.80, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN WING (120G-150G)", cn: "鸡翅膀", pack: "9KG", origin: "BRAZIL", price: 4.50, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN WING (100G-120G)", cn: "鸡翅膀", pack: "2KG x 6PKTS", origin: "BRAZIL", price: 4.40, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN WING (100G-120G)", cn: "鸡翅膀", pack: "9KG", origin: "BRAZIL", price: 4.00, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN WING (80G-100G)", cn: "鸡翅膀", pack: "15KG", origin: "BRAZIL", price: 4.40, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN DRUMSTICK", cn: "鸡小腿", pack: "2KG x 6PKTS", origin: "BRAZIL", price: 3.60, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN MID-JOINT WING", cn: "鸡中翅", pack: "2KG x 6PKTS", origin: "BRAZIL", price: 5.00, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN WINGSTICK / DRUMLET", cn: "鸡翼小腿", pack: "1KG x 12PKTS", origin: "BRAZIL", price: 3.90, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN THIGH", cn: "鸡上腿", pack: "2KG x 6PKTS", origin: "BRAZIL", price: 3.60, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN FILLET", cn: "鸡柳", pack: "2KG x 6PKTS", origin: "BRAZIL", price: 5.30, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "SPRING CHICKEN (800G)", cn: "童子鸡", pack: "10/12NOS", origin: "BRAZIL", price: 4.00, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "SPRING CHICKEN (900G)", cn: "童子鸡", pack: "10/12NOS", origin: "BRAZIL", price: 3.80, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "WHOLE CHICKEN (1.0-1.2kg)", cn: "整只鸡", pack: "10NOS", origin: "BRAZIL", price: 3.80, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "WHOLE CHICKEN (1.4kg)", cn: "整只鸡", pack: "10NOS", origin: "BRAZIL", price: 3.95, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN BONELESS LEG 200 UP", cn: "去骨鸡腿", pack: "2KG x 6PKTS", origin: "BRAZIL", price: 4.50, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN BONELESS LEG (200-280G)", cn: "去骨鸡腿", pack: "2KG x 6PKTS", origin: "BRAZIL", price: 4.60, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN BONELESS LEG SKIN-LESS", cn: "去骨无皮鸡腿", pack: "2KG x 6PKTS", origin: "BRAZIL", price: 4.80, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN BONELESS BREAST SKIN-LESS", cn: "去骨无皮鸡胸", pack: "2KG x 6PKTS", origin: "BRAZIL", price: 5.00, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "FRESH FROZEN WHOLE CHICKEN (1-1.4kg)", cn: "整只鸡", pack: "NOS", origin: "MSIA", price: 3.80, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "FRESH FROZEN WHOLE CHICKEN (1.5-1.6kg)", cn: "整只鸡", pack: "NOS", origin: "MSIA", price: 4.00, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "FRESH FROZEN WHOLE CHICKEN (1.7-2.0kg)", cn: "整只鸡", pack: "NOS", origin: "MSIA", price: 4.50, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN SKIN", cn: "鸡皮", pack: "1KG/PKT", origin: "Denmark", price: 3.50, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN FEET", cn: "鸡脚", pack: "1KG/PKT", origin: "BRAZIL", price: 3.50, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN LIVER", cn: "鸡肝", pack: "1KG/PKT", origin: "BRAZIL", price: 3.50, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN GIZZARD", cn: "鸡胗", pack: "1KG/PKT", origin: "BRAZIL", price: 3.50, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN BONE Fresh Frozen", cn: "鸡骨", pack: "5KG/PKT", origin: "LOCAL", price: 3.50, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "MINCED CHICKEN (SKIN ON)", cn: "鸡肉碎", pack: "2KG/PKT", origin: "BRAZIL", price: 5.20, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "MINCED CHICKEN (SKINLESS)", cn: "无皮鸡肉碎", pack: "2KG/PKT", origin: "BRAZIL", price: 5.50, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "SLICED CHICKEN SKINLESS", cn: "无皮鸡肉片", pack: "2/5KG", origin: "BRAZIL", price: 5.50, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "SLICED CHICKEN SKIN ON", cn: "带皮鸡肉片", pack: "5KG/PKT", origin: "BRAZIL", price: 4.80, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN MIX PORTION (Curry)", cn: "咖哩鸡", pack: "5KG/PKT", origin: "BRAZIL", price: 3.50, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN BONELESS LEG BUTTERFLY", cn: "去骨蝴蝶鸡腿", pack: "5KG/PKT", origin: "BRAZIL", price: 5.00, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN CUBE SKIN ON (3-30G)", cn: "有皮鸡丁", pack: "2/5KG", origin: "BRAZIL", price: 5.00, unit: "KG" },
  { cat: "1. Frozen Chicken", name: "CHICKEN CUBE SKINLESS", cn: "无皮鸡丁", pack: "2/5KG", origin: "BRAZIL", price: 6.00, unit: "KG" },

  // 2. Fresh Chicken
  { cat: "2. Fresh Chicken", name: "BLACK CHICKEN", cn: "墨鸡", pack: "PER NOS", origin: "LOCAL", price: 8.00, unit: "KG" },
  { cat: "2. Fresh Chicken", name: "CHICKEN OLD FOWL", cn: "老母鸡", pack: "PER NOS", origin: "LOCAL", price: 7.00, unit: "KG" },
  { cat: "2. Fresh Chicken", name: "FRESH CHICKEN (1.0-1.7kg)", cn: "新鲜鸡", pack: "PER NOS", origin: "LOCAL", price: 7.00, unit: "KG" },
  { cat: "2. Fresh Chicken", name: "KAMPONG CHICKEN", cn: "甘榜鸡", pack: "PER NOS", origin: "LOCAL", price: 9.50, unit: "KG" },

  // 3. Duck
  { cat: "3. Duck", name: "WHOLE DUCK", cn: "整只鸭", pack: "2.7KG/NOS", origin: "THAILAND", price: 6.50, unit: "KG" },
  { cat: "3. Duck", name: "FROZEN DUCK LEG", cn: "鸭腿", pack: "250-300gm", origin: "THAILAND", price: 12.00, unit: "KG" },
  { cat: "3. Duck", name: "SMOKED DUCK BREAST", cn: "烟熏鸭胸肉", pack: "200gm", origin: "-", price: 5.00, unit: "PC" },
  { cat: "3. Duck", name: "COOKED FRIED DEBONE DUCK", cn: "熟炸去骨鸭", pack: "585-665G", origin: "-", price: 20.00, unit: "KG" },

  // 4. Frozen Beef
  { cat: "4. Frozen Beef", name: "BEEF TENDERLOIN", cn: "牛小里脊肉", pack: "PER NOS", origin: "BRAZIL", price: 20.00, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF STRIPLOIN S.A.", cn: "牛腰肉-南美", pack: "PER NOS", origin: "BRAZIL", price: 12.00, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF GOLDEN COIN", cn: "牛肉金币", pack: "PER NOS", origin: "BRAZIL", price: 11.50, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF FLANK WHOLE", cn: "整块牛肋骨", pack: "PER NOS", origin: "BRAZIL", price: 8.00, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF CUBE ROLL/RIBEYE", cn: "牛肋眼肉卷", pack: "PER NOS", origin: "BRAZIL", price: 12.00, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF TOP SIDE", cn: "牛后腿内侧肉", pack: "PER NOS", origin: "BRAZIL", price: 9.50, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF KNUCKLE", cn: "牛后腿肉", pack: "PER NOS", origin: "BRAZIL", price: 9.50, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF CHUCK TENDER", cn: "牛肩胛软骨", pack: "PER NOS", origin: "BRAZIL", price: 9.50, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF LEG", cn: "牛脚", pack: "PER NOS", origin: "BRAZIL", price: 8.00, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF SHANK / SHIN", cn: "牛健肉", pack: "PER NOS", origin: "BRAZIL", price: 7.50, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF OX TAIL", cn: "牛尾", pack: "PER NOS", origin: "BRAZIL", price: 12.50, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF OX TAIL CUT 1\"", cn: "牛尾切", pack: "PER KG", origin: "BRAZIL", price: 13.50, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF BRISKET / NE / PE", cn: "牛胸肉", pack: "PER NOS", origin: "BRAZIL", price: 8.50, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF SHORT RIB BONE-IN", cn: "牛肋骨肉", pack: "PER NOS", origin: "BRAZIL", price: 13.00, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF CHUCK / BLADE", cn: "牛肉夹头刀片", pack: "PER NOS", origin: "BRAZIL", price: 7.50, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF RIB FINGER", cn: "牛肋指", pack: "PER NOS", origin: "BRAZIL", price: 10.00, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF EYEROUND", cn: "牛肉全方位", pack: "PER NOS", origin: "BRAZIL", price: 9.50, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF SHORTPLATE", cn: "牛肉短板", pack: "-", origin: "USA", price: 13.00, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF SHORT RIB BONELESS", cn: "无骨牛小排", pack: "-", origin: "USA", price: 48.00, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF FLANK STEAK", cn: "牛肋排", pack: "-", origin: "BRAZIL", price: 9.00, unit: "KG" },
  { cat: "4. Frozen Beef", name: "BEEF FOREQUARTER", cn: "牛前腿", pack: "-", origin: "BRAZIL", price: 7.50, unit: "KG" },

  // 5. Beef Offal
  { cat: "5. Beef Offal", name: "BEEF HOCK TENDON", cn: "牛板筋", pack: "PER/KG", origin: "N.Z/AUST/BRZ", price: 12.00, unit: "KG" },
  { cat: "5. Beef Offal", name: "BEEF TRIPE PIECES", cn: "牛肚片", pack: "PER/NOS", origin: "N.Z/AUST", price: 5.00, unit: "KG" },
  { cat: "5. Beef Offal", name: "BEEF HONEYCOMB TRIPE", cn: "蜂巢牛肚", pack: "PER/KG", origin: "N.Z/AUST", price: 8.50, unit: "KG" },
  { cat: "5. Beef Offal", name: "BEEF BONE", cn: "牛骨", pack: "PER/KG", origin: "N.Z/AUST/BRZ", price: 2.80, unit: "KG" },
  { cat: "5. Beef Offal", name: "BEEF LIVER", cn: "牛肝", pack: "PER/KG", origin: "N.Z/AUST", price: 4.00, unit: "KG" },
  { cat: "5. Beef Offal", name: "BEEF HEART", cn: "牛心", pack: "PER/KG", origin: "AUST", price: 4.50, unit: "KG" },
  { cat: "5. Beef Offal", name: "BEEF LUNG", cn: "牛肺", pack: "PER/KG", origin: "N.Z/AUST/BRZ", price: 5.00, unit: "KG" },
  { cat: "5. Beef Offal", name: "BEEF SPLEEN", cn: "牛脾", pack: "PER/KG", origin: "N.Z/AUST", price: 3.50, unit: "KG" },
  { cat: "5. Beef Offal", name: "BEEF TONGUE", cn: "牛舌", pack: "PER/KG", origin: "N.Z/AUST", price: 24.00, unit: "KG" },
  { cat: "5. Beef Offal", name: "BEEF OMASUM", cn: "牛肉瓣", pack: "PER/KG", origin: "BRAZIL", price: 9.00, unit: "KG" },
  { cat: "5. Beef Offal", name: "BEEF CHEEK", cn: "牛脸颊", pack: "PER/KG", origin: "BRAZIL", price: 10.00, unit: "KG" },

  // 6. Service Added Beef
  { cat: "6. Service Added Beef", name: "BEEF LUNG CUT (1/2 INCH)", cn: "牛肺切寸", pack: "PER/KG", origin: "N.Z/AUST/BRZ", price: 6.00, unit: "KG" },
  { cat: "6. Service Added Beef", name: "MINCED BEEF", cn: "牛肉碎", pack: "2KG/PKT", origin: "BRAZIL", price: 8.00, unit: "KG" },
  { cat: "6. Service Added Beef", name: "BEEF CUBE", cn: "牛丁", pack: "2KG/PKT", origin: "BRAZIL", price: 9.00, unit: "KG" },
  { cat: "6. Service Added Beef", name: "BEEF CUBE (PRIME) KNUCKLE", cn: "牛丁-高级", pack: "2KG/PKT", origin: "BRAZIL", price: 11.00, unit: "KG" },
  { cat: "6. Service Added Beef", name: "BEEF CUBE ROLL SLICED", cn: "肥牛肉片", pack: "2KG/PKT", origin: "BRAZIL", price: 13.00, unit: "KG" },
  { cat: "6. Service Added Beef", name: "BEEF KNUCKLE SLICED", cn: "牛后腿肉片", pack: "2KG/PKT", origin: "BRAZIL", price: 11.00, unit: "KG" },
  { cat: "6. Service Added Beef", name: "BEEF STRIPLOIN (STEAK CUT)", cn: "切牛腰肉排", pack: "1KG/PKT", origin: "BRAZIL", price: 13.00, unit: "KG" },
  { cat: "6. Service Added Beef", name: "BEEF CUBEROLL STEAK (150-160G)", cn: "切牛肋眼肉排", pack: "2KG/PKT", origin: "BRAZIL", price: 13.00, unit: "KG" },
  { cat: "6. Service Added Beef", name: "BEEF BRISKET SLICED", cn: "牛胸肉切片", pack: "2KG/PKT", origin: "BRAZIL", price: 10.00, unit: "KG" },
  { cat: "6. Service Added Beef", name: "BEEF LEG SLICED", cn: "牛腿切片", pack: "5KG/PKT", origin: "BRAZIL", price: 9.00, unit: "KG" },
  { cat: "6. Service Added Beef", name: "BEEF SHABU (SHORTPLATE)", cn: "牛肉短板切片", pack: "1KG/PKT", origin: "USA", price: 14.00, unit: "KG" },

  // 7. Lamb
  { cat: "7. Lamb", name: "LAMB LEG BONELESS", cn: "无骨羔羊腿肉", pack: "PER NOS", origin: "N.Z/AUST", price: 18.00, unit: "KG" },
  { cat: "7. Lamb", name: "LAMB LEG BONE-IN", cn: "有骨羔羊腿肉", pack: "PER NOS", origin: "N.Z/AUST", price: 11.50, unit: "KG" },
  { cat: "7. Lamb", name: "LAMB RACK", cn: "羊部椎", pack: "PER NOS", origin: "N.Z/AUST", price: 28.00, unit: "KG" },
  { cat: "7. Lamb", name: "LAMB RACK FRENCHED", cn: "羊部椎", pack: "PER NOS", origin: "N.Z/AUST", price: 38.00, unit: "KG" },
  { cat: "7. Lamb", name: "LAMB SHANK", cn: "羊健肉", pack: "PER NOS", origin: "N.Z/AUST", price: 11.50, unit: "KG" },
  { cat: "7. Lamb", name: "LAMB FLAP", cn: "羔羊排骨", pack: "PER NOS", origin: "N.Z/AUST", price: 11.50, unit: "KG" },
  { cat: "7. Lamb", name: "LAMB LEG BONELESS CUBE", cn: "无骨羔羊腿肉丁", pack: "PER NOS", origin: "N.Z/AUST", price: 19.50, unit: "KG" },
  { cat: "7. Lamb", name: "LAMB MINCED", cn: "羊肉碎", pack: "2KG/PKT", origin: "N.Z/AUST", price: 19.00, unit: "KG" },
  { cat: "7. Lamb", name: "LAMB SHOULDER CHOP (150G)", cn: "羊肩肉", pack: "-", origin: "N.Z/AUST", price: 12.50, unit: "KG" },
  { cat: "7. Lamb", name: "LAMB CHOP (80G)", cn: "羊扒", pack: "-", origin: "N.Z/AUST", price: 14.50, unit: "KG" },
  { cat: "7. Lamb", name: "LAMB LEG BONE-IN CUT", cn: "有骨羔羊腿肉", pack: "-", origin: "N.Z/AUST", price: 13.00, unit: "KG" },
  { cat: "7. Lamb", name: "LAMB SHANK CUT", cn: "羊腿切块", pack: "PER NOS", origin: "N.Z/AUST", price: 13.50, unit: "KG" },

  // 8. Mutton
  { cat: "8. Mutton", name: "MUTTON LEG BONELESS", cn: "无骨羊腿肉", pack: "PER NOS", origin: "N.Z/AUST", price: 13.50, unit: "KG" },
  { cat: "8. Mutton", name: "MUTTON LEG BONE-IN", cn: "有骨羊腿肉", pack: "PER NOS", origin: "N.Z/AUST", price: 10.50, unit: "KG" },
  { cat: "8. Mutton", name: "MUTTON LEG BONE-IN CUT", cn: "有骨羊腿肉切", pack: "PER NOS", origin: "N.Z/AUST", price: 12.50, unit: "KG" },
  { cat: "8. Mutton", name: "MUTTON TRUNK CUBE (1X1)", cn: "羊干块", pack: "PER/KG", origin: "N.Z/AUST", price: 13.00, unit: "KG" },
  { cat: "8. Mutton", name: "MUTTON TRIPE", cn: "羊肚", pack: "-", origin: "N.Z/AUST", price: 5.00, unit: "KG" },
  { cat: "8. Mutton", name: "MUTTON TRIPE CUT", cn: "羊肚切块", pack: "-", origin: "N.Z/AUST", price: 6.50, unit: "KG" },
  { cat: "8. Mutton", name: "MUTTON SLICED", cn: "羊腿肉片", pack: "PER/KG", origin: "N.Z/AUST", price: 16.00, unit: "KG" },
  { cat: "8. Mutton", name: "MUTTON MINCED", cn: "羊肉碎", pack: "PER/KG", origin: "N.Z/AUST", price: 12.00, unit: "KG" },
  { cat: "8. Mutton", name: "MUTTON BONELESS LEG CUBE", cn: "羊腿肉丁", pack: "PER/KG", origin: "N.Z/AUST", price: 15.00, unit: "KG" },
  { cat: "8. Mutton", name: "MUTTON BONE CUT", cn: "羊骨切块", pack: "PER/KG", origin: "N.Z/AUST", price: 5.50, unit: "KG" },
  { cat: "8. Mutton", name: "MUTTON KNUCKLE TIP", cn: "羊指尖", pack: "PER/KG", origin: "N.Z/AUST", price: 4.50, unit: "KG" },

  // 9. Fish
  { cat: "9. Fish", name: "FROZEN SALMON FILLET", cn: "三文鱼片", pack: "CATCH WEIGHT", origin: "-", price: 19.00, unit: "KG" },
  { cat: "9. Fish", name: "FROZEN SALMON FILLET CUT", cn: "三文鱼片", pack: "CATCH WEIGHT", origin: "-", price: 21.00, unit: "KG" },
  { cat: "9. Fish", name: "FROZEN SALMON SKINLESS CUBE", cn: "去皮三文鱼块", pack: "500gm/PKT", origin: "-", price: 10.20, unit: "PKT" },
  { cat: "9. Fish", name: "CREAM DORY FISH 170-225", cn: "多利鱼", pack: "6KG/CTN", origin: "-", price: 21.00, unit: "CTN" },
  { cat: "9. Fish", name: "CREAM DORY FISH 120-170", cn: "多利鱼", pack: "10KG/CTN", origin: "-", price: 44.00, unit: "KG" },
  { cat: "9. Fish", name: "FROZEN SAN EE FILLET SLICED", cn: "生鱼片", pack: "-", origin: "-", price: 12.00, unit: "KG" },
  { cat: "9. Fish", name: "BATANG STEAK", cn: "鲅鱼饼", pack: "10KG/CTN", origin: "-", price: 9.50, unit: "KG" },
  { cat: "9. Fish", name: "PATIN FISH", cn: "帕丁鱼", pack: "10KG/CTN", origin: "-", price: 5.00, unit: "KG" },
  { cat: "9. Fish", name: "SEABASS FISH FILLET SKIN ON", cn: "鲈鱼片", pack: "-", origin: "-", price: 20.00, unit: "KG" },
  { cat: "9. Fish", name: "SEABASS FISH FILLET SKINLESS", cn: "鲈鱼片", pack: "-", origin: "-", price: 22.50, unit: "KG" },
  { cat: "9. Fish", name: "KUNNING (GUTTED)", cn: "军冷鱼", pack: "PER/KG", origin: "-", price: 4.00, unit: "KG" },
  { cat: "9. Fish", name: "SABA MACKEREL FILLET", cn: "秋刀鱼", pack: "20KG/CTN", origin: "-", price: 10.00, unit: "KG" },
  { cat: "9. Fish", name: "SELAR (GUTTED)", cn: "色拉鱼", pack: "PER/KG", origin: "-", price: 4.00, unit: "KG" },
  { cat: "9. Fish", name: "GOLDEN POMFRET (150-200)", cn: "金鲳鱼", pack: "2KG/PKT", origin: "-", price: 8.30, unit: "KG" },
  { cat: "9. Fish", name: "GOLDEN POMFRET (200-300)", cn: "金鲳鱼", pack: "2KG/PKT", origin: "-", price: 8.30, unit: "KG" },
  { cat: "9. Fish", name: "DORY FISH CUBE", cn: "多利鱼块", pack: "6KG/CTN", origin: "-", price: 4.50, unit: "KG" },
  { cat: "9. Fish", name: "SABA FISH", cn: "沙巴鱼", pack: "1PKT/4PC", origin: "-", price: 6.80, unit: "KG" },
  { cat: "9. Fish", name: "KAMBONG FISH", cn: "甘榜鱼", pack: "1KG/PKT", origin: "-", price: 4.00, unit: "KG" },
  { cat: "9. Fish", name: "WHITE FISH FILLET", cn: "白鱼片", pack: "5kg/ctn", origin: "-", price: 6.00, unit: "KG" },
  { cat: "9. Fish", name: "SMOKED SALMON SLICED", cn: "烟熏三文鱼片", pack: "100gm", origin: "-", price: 3.50, unit: "PC" },
  { cat: "9. Fish", name: "SMOKED SALMON SLICED", cn: "烟熏三文鱼片", pack: "1KG", origin: "-", price: 35.00, unit: "KG" },

  // 10. Frozen Sotong
  { cat: "10. Frozen Sotong", name: "CUTTLEFISH (SOTONG KEMBANG)", cn: "墨鱼", pack: "PER/KG", origin: "-", price: 7.30, unit: "KG" },
  { cat: "10. Frozen Sotong", name: "SQUID CLEANED (6-8)", cn: "鱿鱼", pack: "PER/KG", origin: "-", price: 6.00, unit: "KG" },
  { cat: "10. Frozen Sotong", name: "SQUID RING", cn: "鱿鱼圈", pack: "1KG/PKT", origin: "-", price: 6.00, unit: "KG" },
  { cat: "10. Frozen Sotong", name: "SOTONG CUT FLOWER", cn: "苏东切花", pack: "PER/KG", origin: "China", price: 6.50, unit: "KG" },
  { cat: "10. Frozen Sotong", name: "SOTONG PASTE", cn: "苏东膏", pack: "PER/KG", origin: "-", price: 7.00, unit: "KG" },

  // 11. Frozen Scallop
  { cat: "11. Frozen Scallop", name: "HALF SHELL SCALLOP", cn: "半壳干贝", pack: "PER/KG", origin: "-", price: 10.00, unit: "KG" },

  // 12. Surimi
  { cat: "12. Surimi Products", name: "CUTTLEFISH BALL", cn: "苏东丸", pack: "500GM/PKT", origin: "-", price: 9.00, unit: "KG" },
  { cat: "12. Surimi Products", name: "SEAFOOD CHEESE TOFU", cn: "海鲜芝士豆腐", pack: "500G/PKT", origin: "-", price: 4.40, unit: "KG" },

  // 13. Other Seafood
  { cat: "13. Other Seafood", name: "CRAB BITE", cn: "螃蟹粒", pack: "PER/KG", origin: "-", price: 6.80, unit: "KG" },
  { cat: "13. Other Seafood", name: "HALF SHELL MUSSEL (GREEN)", cn: "半壳河蚌", pack: "1KG/PKT", origin: "-", price: 14.50, unit: "KG" },
  { cat: "13. Other Seafood", name: "FROZEN MUSSEL MEAT", cn: "冷冻贻贝肉", pack: "1KG/PKT", origin: "-", price: 6.50, unit: "KG" },
  { cat: "13. Other Seafood", name: "CRAB MEAT", cn: "蟹肉", pack: "454G/CAN", origin: "THAILAND", price: 22.50, unit: "KG" },
  { cat: "13. Other Seafood", name: "FLOWER CRAB 2L", cn: "花蟹", pack: "PER/PKT", origin: "-", price: 10.50, unit: "KG" },
  { cat: "13. Other Seafood", name: "FLAVOURED CRAB STICK", cn: "蟹柳", pack: "250GM/PKT", origin: "THAILAND", price: 1.60, unit: "PKT" },
  { cat: "13. Other Seafood", name: "OYSTER MEAT", cn: "牡蛎肉", pack: "1KG/PKT", origin: "-", price: 7.50, unit: "KG" },
  { cat: "13. Other Seafood", name: "SEAFOOD LALA", cn: "啦啦", pack: "500GM/PKT", origin: "-", price: 2.30, unit: "PKT" },

  // 14. Prawn
  { cat: "14. Prawn", name: "WHOLE PRAWN 31-40", cn: "全虾", pack: "2KG x 6PKTS", origin: "-", price: 26.00, unit: "PKT" },
  { cat: "14. Prawn", name: "WHOLE PRAWN 40-50", cn: "全虾", pack: "2KG x 6PKTS", origin: "-", price: 24.00, unit: "PKT" },
  { cat: "14. Prawn", name: "PRAWN PD 21-25", cn: "无尾无壳虾", pack: "1KG x 10PKTS", origin: "-", price: 9.25, unit: "KG" },
  { cat: "14. Prawn", name: "PRAWN PD 26-30", cn: "无尾无壳虾", pack: "1KG x 10PKTS", origin: "-", price: 8.00, unit: "KG" },
  { cat: "14. Prawn", name: "PRAWN PD 31-40", cn: "无尾无壳虾", pack: "1KG x 10PKTS", origin: "-", price: 7.80, unit: "KG" },
  { cat: "14. Prawn", name: "PRAWN PD 41-50", cn: "无尾无壳虾", pack: "1KG x 10PKTS", origin: "-", price: 7.00, unit: "KG" },
  { cat: "14. Prawn", name: "PRAWN PD 51-60", cn: "无尾无壳虾", pack: "1KG x 10PKTS", origin: "-", price: 6.80, unit: "KG" },
  { cat: "14. Prawn", name: "PRAWN PD 71-90", cn: "无尾无壳虾", pack: "1KG x 10PKTS", origin: "-", price: 6.80, unit: "KG" },
  { cat: "14. Prawn", name: "PRAWN PEELED 100-200G", cn: "小虾仁", pack: "1KG x 10PKTS", origin: "-", price: 6.00, unit: "KG" },
  { cat: "14. Prawn", name: "PRAWN PTO 16-20", cn: "有尾无壳虾", pack: "PER PKT", origin: "-", price: 10.50, unit: "KG" },
  { cat: "14. Prawn", name: "PRAWN PTO 21-25", cn: "有尾无壳虾", pack: "PER PKT", origin: "-", price: 9.25, unit: "KG" },
  { cat: "14. Prawn", name: "PRAWN PTO 26-30", cn: "有尾无壳虾", pack: "PER PKT", origin: "-", price: 8.00, unit: "KG" },
  { cat: "14. Prawn", name: "PRAWN PTO 31-40", cn: "有尾无壳虾", pack: "PER PKT", origin: "-", price: 7.80, unit: "KG" },
  { cat: "14. Prawn", name: "PRAWN PTO 41-50", cn: "有尾无壳虾", pack: "PER PKT", origin: "-", price: 7.20, unit: "KG" },
  { cat: "14. Prawn", name: "PRAWN PTO 51-60", cn: "有尾无壳虾", pack: "PER PKT", origin: "-", price: 6.90, unit: "KG" },
  { cat: "14. Prawn", name: "COOKED PRAWN 30/40", cn: "熟虾", pack: "PER PKT", origin: "-", price: 12.00, unit: "KG" },

  // 15. Frozen Vegetables
  { cat: "15. Frozen Vegetables", name: "MIX VEGETABLE", cn: "杂豆", pack: "10KG/CTN", origin: "CHINA", price: 2.20, unit: "KG" },
  { cat: "15. Frozen Vegetables", name: "GREEN PEAS", cn: "青豆", pack: "12PKTS/CTN", origin: "USA", price: 4.20, unit: "KG" },
  { cat: "15. Frozen Vegetables", name: "SWEET CORN", cn: "玉米", pack: "12PKTS/CTN", origin: "USA", price: 3.80, unit: "KG" },

  // 16. Dairy Products
  { cat: "16. Dairy Products", name: "PHILADELPHIA CREAM CHEESE", cn: "费城奶油奶酪", pack: "250gm", origin: "AUSTRALIA", price: 7.10, unit: "PC" },
  { cat: "16. Dairy Products", name: "PERFECT PASTA CREAM", cn: "完美意面酱", pack: "1 Litre", origin: "EMBORG", price: 2.05, unit: "PKT" },
  { cat: "16. Dairy Products", name: "FULL CREAM MILK", cn: "全脂牛奶", pack: "1 Litre", origin: "EMBORG", price: 2.05, unit: "PKT" },
  { cat: "16. Dairy Products", name: "MOZARELLA CHEESE SHREDDED", cn: "乳酪丝", pack: "2KG/PKT", origin: "Emborg", price: 29.00, unit: "PKT" },
  { cat: "16. Dairy Products", name: "PARMESAN CHEESE GRATED", cn: "乳酪粉", pack: "1.0KG/PKT", origin: "-", price: 27.00, unit: "PKT" },
  { cat: "16. Dairy Products", name: "BURGER SLICED CHEDDAR", cn: "乳酪片", pack: "84PCS/PKT", origin: "Emborg", price: 14.00, unit: "PKT" },
  { cat: "16. Dairy Products", name: "NACHO CHEESE DIP", cn: "乳酪-薯条", pack: "1KG/PKT", origin: "-", price: 7.00, unit: "PKT" },
  { cat: "16. Dairy Products", name: "BUTTER SALTED", cn: "牛油-咸", pack: "250g", origin: "SCS", price: 4.50, unit: "PC" },
  { cat: "16. Dairy Products", name: "BUTTER UNSALTED", cn: "牛油-无咸", pack: "250g", origin: "SCS", price: 4.50, unit: "PC" },

  // 17. Satay
  { cat: "17. Satay", name: "CHICKEN SATAY", cn: "鸡沙爹串", pack: "50 STICK/PKT", origin: "-", price: 22.50, unit: "CTN" },
  { cat: "17. Satay", name: "MUTTON SATAY", cn: "牛沙爹串", pack: "50 STICK/PKT", origin: "-", price: 28.00, unit: "CTN" },
  { cat: "17. Satay", name: "BEEF SATAY", cn: "羊沙爹串", pack: "50 STICK/PKT", origin: "-", price: 26.50, unit: "CTN" },
  { cat: "17. Satay", name: "SATAY SAUCE", cn: "沙爹酱", pack: "500 GM/PKT", origin: "-", price: 4.00, unit: "PKT" },
  { cat: "17. Satay", name: "ROASTED CHICKEN SATAY", cn: "鸡沙爹串", pack: "20 STICK/PKT", origin: "-", price: 22.50, unit: "CTN" },

  // 18. Condiments
  { cat: "18. Condiments", name: "CHILI SAUCE SACHET", cn: "辣椒酱-包装", pack: "1000'S", origin: "-", price: 38.00, unit: "CTN" },
  { cat: "18. Condiments", name: "TOMATO KETCHUP SACHET", cn: "番茄酱-包装", pack: "1000'S", origin: "-", price: 38.00, unit: "CTN" },

  // 19. Food Coating
  { cat: "19. Food Coating", name: "BREAD CRUMB (WHITE)", cn: "面包屑(白)", pack: "1KG", origin: "-", price: 3.50, unit: "PKT" },
  { cat: "19. Food Coating", name: "BREAD CRUMB (ORANGE)", cn: "面包屑(橙)", pack: "1KG", origin: "-", price: 3.50, unit: "PKT" },
  { cat: "19. Food Coating", name: "CRISPY CHICKEN BREADER", cn: "鸡粉", pack: "1KG/PKT", origin: "-", price: 5.50, unit: "PKT" },

  // 20. Dressing
  { cat: "20. Dressing", name: "MAYONNAISE REFILL", cn: "美乃滋-包装", pack: "3L x 4", origin: "-", price: 13.90, unit: "PKT" },
  { cat: "20. Dressing", name: "MAYONNAISE TUBS", cn: "美乃滋-桶装", pack: "3L x 4", origin: "-", price: 15.00, unit: "PKT" },
  { cat: "20. Dressing", name: "TARTAR SAUCE", cn: "塔塔酱", pack: "3L x 4", origin: "-", price: 14.00, unit: "PKT" },
  { cat: "20. Dressing", name: "COLESLAW DRESSING", cn: "菜丝酱", pack: "3L x 4", origin: "-", price: 14.50, unit: "PKT" },
  { cat: "20. Dressing", name: "MAYO LITE", cn: "低脂美乃滋", pack: "3L x 4", origin: "-", price: 13.30, unit: "PKT" },

  // 21. Others (Sides)
  { cat: "21. Others", name: "WHOLE PEELED TOMATOES", cn: "去皮番茄", pack: "2.55KG", origin: "-", price: 8.10, unit: "TIN" },
  { cat: "21. Others", name: "DICED/CHOPPED TOMATOES", cn: "番茄切碎酱", pack: "2.55KG", origin: "-", price: 8.00, unit: "TIN" },
  { cat: "21. Others", name: "SPAGHETTI NOODLE", cn: "意大利直面", pack: "500G", origin: "-", price: 1.60, unit: "PKT" },
  { cat: "21. Others", name: "MASHED POTATO", cn: "马铃薯泥", pack: "2.39KG", origin: "USA", price: 18.00, unit: "TUB" },
  { cat: "21. Others", name: "FRIES SHOESTRING", cn: "薯条-直切", pack: "2.5KG/PKT", origin: "-", price: 3.00, unit: "KG" },
  { cat: "21. Others", name: "FRIES CRINKLE CUT", cn: "薯条-曲切", pack: "1KG/PKT", origin: "-", price: 3.50, unit: "KG" },
  { cat: "21. Others", name: "POTATO WEDGES", cn: "薯片块", pack: "1KG/PKT", origin: "-", price: 5.80, unit: "KG" },
  { cat: "21. Others", name: "FRIES COATED STRAIGHT", cn: "薯条-直切(大)", pack: "2.0KG/PKT", origin: "-", price: 3.90, unit: "KG" },
  { cat: "21. Others", name: "FRIES COATED SHOESTRING", cn: "薯条-直切", pack: "2.0KG/PKT", origin: "-", price: 3.90, unit: "KG" },
  { cat: "21. Others", name: "HASH BROWN RECTANGLE", cn: "薯饼", pack: "20PC", origin: "-", price: 5.50, unit: "PKT" },
  { cat: "21. Others", name: "ONION RING", cn: "洋葱圈", pack: "1KG/PKT", origin: "-", price: 6.30, unit: "PKT" },
  { cat: "21. Others", name: "SWEET POTATO FRIES", cn: "红薯条", pack: "1PKT", origin: "-", price: 11.00, unit: "PKT" },
  { cat: "21. Others", name: "TATER GEM", cn: "薯饼粒", pack: "6PKTS/5LBS", origin: "-", price: 9.50, unit: "KG" },

  // 23. Finger Food
  { cat: "23. Finger Food", name: "CHICKEN NUGGET", cn: "麦金鸡", pack: "1KG/PKT", origin: "FREEZEPAK", price: 6.80, unit: "PKT" },
  { cat: "23. Finger Food", name: "CHICKEN NUGGET (FLAMMING)", cn: "麦金鸡(辣)", pack: "800GM/PKT", origin: "-", price: 7.50, unit: "PKT" },
  { cat: "23. Finger Food", name: "CHICKEN HOT DOG", cn: "鸡热狗", pack: "24PKTS/CTN", origin: "BRAZIL", price: 1.25, unit: "PKT" },
  { cat: "23. Finger Food", name: "CHICKEN HOT DOG 6\"", cn: "鸡热狗", pack: "1PKT", origin: "LOCAL", price: 10.50, unit: "PKT" },
  { cat: "23. Finger Food", name: "CHEESE CHICKEN HOT DOG 7\"", cn: "芝士鸡肉热狗", pack: "1PKT", origin: "LOCAL", price: 10.50, unit: "PKT" },
  { cat: "23. Finger Food", name: "CHICKEN PICNIC HAM SLICED", cn: "鸡火腿", pack: "1KG/PKT", origin: "LOCAL", price: 8.50, unit: "KG" },
  { cat: "23. Finger Food", name: "CHICKEN WITH SEAWEED", cn: "紫菜鸡", pack: "1KG/PKT", origin: "THAILAND", price: 12.50, unit: "KG" },
  { cat: "23. Finger Food", name: "CHICKEN CHIPOLATA", cn: "奇波拉塔香肠", pack: "1KG/PKT", origin: "LOCAL", price: 8.50, unit: "KG" },
  { cat: "23. Finger Food", name: "FISH BURGER", cn: "鱼汉堡", pack: "32PCS/PKT", origin: "-", price: 12.00, unit: "BOX" },
  { cat: "23. Finger Food", name: "FISH TEMPURA", cn: "天妇罗鱼", pack: "40PCS/BOX", origin: "MSIA", price: 45.00, unit: "BOX" },
  { cat: "23. Finger Food", name: "THAI FISH CAKE", cn: "泰式鱼饼", pack: "3KG", origin: "-", price: 9.20, unit: "KG" },
  { cat: "23. Finger Food", name: "BREADED SQUID RING", cn: "海鲜面包鱿鱼圈", pack: "1KG", origin: "LOCAL", price: 15.50, unit: "PKT" },
  { cat: "23. Finger Food", name: "SEAFOOD CRAB STICK", cn: "蟹条", pack: "10PCS", origin: "LOCAL", price: 1.60, unit: "PKT" },
  { cat: "23. Finger Food", name: "PACIFIC FISH CHIP", cn: "鱼柳片", pack: "10PCS", origin: "-", price: 3.15, unit: "PKT" },
  { cat: "23. Finger Food", name: "FISH NUGGET", cn: "鱼块", pack: "PER/PKT", origin: "-", price: 3.50, unit: "PKT" },
  { cat: "23. Finger Food", name: "FISH FINGER", cn: "鱼指", pack: "10PCS", origin: "-", price: 3.60, unit: "PKT" },
  { cat: "23. Finger Food", name: "FISH POP", cn: "鱼爆", pack: "500GM/PKT", origin: "-", price: 6.50, unit: "PKT" },
  { cat: "23. Finger Food", name: "BREADED FISH DORY", cn: "面包屑多利鱼", pack: "1KG/PKT", origin: "-", price: 10.00, unit: "KG" },
  { cat: "23. Finger Food", name: "BREADED WHITE FISH", cn: "面包白鱼", pack: "-", origin: "-", price: 12.00, unit: "KG" },
  { cat: "23. Finger Food", name: "CHICKY CORN STICK", cn: "鸡肉玉米棒", pack: "1KG/26PCS", origin: "-", price: 9.00, unit: "KG" },
  { cat: "23. Finger Food", name: "CHICKY CORN STICK CHEESE", cn: "鸡肉玉米棒(芝士)", pack: "1KG/26PCS", origin: "-", price: 12.00, unit: "KG" },
  { cat: "23. Finger Food", name: "VEGETABLE SPRING ROLL", cn: "蔬菜春卷", pack: "500GM/PKT", origin: "MALAYSIA", price: 4.50, unit: "PKT" },
  { cat: "23. Finger Food", name: "SAMOSA", cn: "萨莫萨", pack: "450GM/PKT", origin: "MALAYSIA", price: 4.50, unit: "PKT" },

  // 24. Cooked Product
  { cat: "24. Cooked Product", name: "BEEF BALL 20GM", cn: "牛肉丸", pack: "1KG/PKT", origin: "-", price: 11.00, unit: "KG" },
  { cat: "24. Cooked Product", name: "SWEDISH MEAT BALL", cn: "瑞典肉丸", pack: "1KG/PKT", origin: "-", price: 11.00, unit: "KG" },
  { cat: "24. Cooked Product", name: "BEEF BALL 10GM", cn: "牛肉丸", pack: "1KG/PKT", origin: "-", price: 11.00, unit: "KG" },
  { cat: "24. Cooked Product", name: "CHICKEN CUTLET", cn: "炸鸡排", pack: "1KG/PKT", origin: "-", price: 8.30, unit: "KG" },
  { cat: "24. Cooked Product", name: "CHICKEN PRAWN PASTE WING", cn: "虾酱鸡中翅", pack: "1KG/PKT", origin: "-", price: 11.00, unit: "KG" },
  { cat: "24. Cooked Product", name: "CHICKEN KARAAGE ORIGINAL", cn: "炸鸡原味", pack: "1KG/PKT", origin: "-", price: 10.00, unit: "KG" },
  { cat: "24. Cooked Product", name: "CHICKEN KARAAGE SPICY", cn: "炸鸡辣味", pack: "1KG/PKT", origin: "-", price: 10.00, unit: "KG" },
  { cat: "24. Cooked Product", name: "CHICKEN POP ORIGINAL", cn: "原味鸡爆米花", pack: "1KG/PKT", origin: "-", price: 10.00, unit: "KG" },
  { cat: "24. Cooked Product", name: "CHICKEN POP SPICY", cn: "辣鸡爆米花", pack: "1KG/PKT", origin: "-", price: 10.00, unit: "KG" },
  { cat: "24. Cooked Product", name: "CHICKEN WINGSTICK SPICY", cn: "辣鸡翅", pack: "1KG/PKT", origin: "-", price: 9.50, unit: "KG" },
  { cat: "24. Cooked Product", name: "BREADED CHICKEN THIGH", cn: "面包屑鸡腿肉", pack: "CATCH WEIGHT", origin: "-", price: 10.00, unit: "KG" },
  { cat: "24. Cooked Product", name: "CHICKEN BALL", cn: "鸡肉丸", pack: "1KG", origin: "-", price: 9.60, unit: "KG" },
  { cat: "24. Cooked Product", name: "ROASTED CHICKEN TERIYAKI", cn: "照烧烤鸡", pack: "CATCH WEIGHT", origin: "-", price: 11.00, unit: "KG" },
  { cat: "24. Cooked Product", name: "ROASTED CHICKEN CAJUN", cn: "卡津烤鸡", pack: "CATCH WEIGHT", origin: "-", price: 11.00, unit: "KG" },
  { cat: "24. Cooked Product", name: "ROASTED CHICKEN SPICY", cn: "辣味烤鸡", pack: "CATCH WEIGHT", origin: "-", price: 11.00, unit: "KG" },
  { cat: "24. Cooked Product", name: "STEAMED CHICKEN SAUSAGE", cn: "蒸鸡肉肠", pack: "20PC/PKT", origin: "-", price: 8.50, unit: "PKT" },
  { cat: "24. Cooked Product", name: "CRISPY CHICKEN WING", cn: "脆皮鸡翅", pack: "1KG/PKT", origin: "-", price: 10.00, unit: "KG" },
  { cat: "24. Cooked Product", name: "CHICKEN STEAK MALA", cn: "马拉鸡排", pack: "1KG/PKT", origin: "-", price: 11.00, unit: "KG" },
  { cat: "24. Cooked Product", name: "BEEF RENDANG", cn: "仁当牛肉", pack: "500GM/PKT", origin: "-", price: 29.00, unit: "KG" },
  { cat: "24. Cooked Product", name: "TURKEY BACON", cn: "火鸡培根", pack: "1KG/PKT", origin: "-", price: 13.80, unit: "KG" },

  // 25. Patties
  { cat: "25. Patties", name: "CHICKEN BREADED PATTIES", cn: "面包屑鸡肉饼", pack: "1.8KG/30PCS", origin: "-", price: 17.00, unit: "BOX" },
  { cat: "25. Patties", name: "CHICKEN PATTIES ORIGINAL 60G", cn: "鸡肉饼", pack: "18PCS", origin: "-", price: 9.00, unit: "KG" },
  { cat: "25. Patties", name: "CHICKEN PATTIES ORIGINAL 120G", cn: "鸡肉饼", pack: "10PCS", origin: "-", price: 1.20, unit: "PC" },
  { cat: "25. Patties", name: "BEEF PATTIES 60GM", cn: "牛肉饼", pack: "200PCS", origin: "-", price: 96.00, unit: "CTN" },
  { cat: "25. Patties", name: "BEEF PATTIES 60GM (RETAIL)", cn: "牛肉饼", pack: "10PCS", origin: "-", price: 5.80, unit: "PKT" },
  { cat: "25. Patties", name: "BEEF PATTIES 100GM", cn: "牛肉饼", pack: "10PCS", origin: "-", price: 10.00, unit: "PKT" },
  { cat: "25. Patties", name: "FISH PATTIES 100GM", cn: "鱼饼", pack: "10PCS", origin: "-", price: 10.00, unit: "PKT" },

  // 26. BBQ Marinated
  { cat: "26. BBQ Marinated", name: "MARINATED CHICKEN WING", cn: "腌制鸡翅", pack: "1KG", origin: "BBQ/Garlic/Spicy", price: 9.20, unit: "KG" },
  { cat: "26. BBQ Marinated", name: "MARINATED CHICKEN WINGSTICK", cn: "腌制鸡小腿", pack: "1KG", origin: "BBQ/Garlic/Spicy", price: 9.20, unit: "KG" },
  { cat: "26. BBQ Marinated", name: "MARINATED CHICKEN MID-JOINT", cn: "腌制鸡中翅", pack: "1KG", origin: "BBQ/Garlic/Spicy", price: 12.00, unit: "KG" },
  { cat: "26. BBQ Marinated", name: "MARINATED CHICKEN CHOP", cn: "腌制鸡排", pack: "1KG", origin: "BBQ/Garlic/Spicy", price: 12.90, unit: "KG" },
  { cat: "26. BBQ Marinated", name: "MARINATED BEEF STEAK", cn: "腌制牛排", pack: "1KG", origin: "BBQ/Garlic/Spicy", price: 22.00, unit: "KG" },
  { cat: "26. BBQ Marinated", name: "MARINATED LAMB CHOP", cn: "腌制羊扒", pack: "1KG", origin: "BBQ/Garlic/Spicy", price: 23.00, unit: "KG" },

  // Dried Items
  { cat: "Dried Items", name: "AROMAT SEASONING POWDER", cn: "芳香调味粉", pack: "2.2kg", origin: "-", price: 25.80, unit: "PC" },
  { cat: "Dried Items", name: "BLACK PEPPER", cn: "黑胡椒", pack: "1kg", origin: "-", price: 15.60, unit: "PC" },
  { cat: "Dried Items", name: "CHICKEN SEASONING POWDER", cn: "鸡肉调味粉", pack: "2.2kg", origin: "-", price: 33.15, unit: "PC" },
  { cat: "Dried Items", name: "COCONUT CREAM", cn: "椰子奶油", pack: "1L", origin: "-", price: 5.00, unit: "PC" },
  { cat: "Dried Items", name: "CORIANDER SEEDS", cn: "芫荽籽", pack: "1kg", origin: "-", price: 5.00, unit: "PC" },
  { cat: "Dried Items", name: "CUMIN POWDER", cn: "孜然粉", pack: "500g", origin: "-", price: 4.90, unit: "PC" },
  { cat: "Dried Items", name: "CURRY POWDER", cn: "咖喱粉", pack: "1kg", origin: "-", price: 8.90, unit: "PC" },
  { cat: "Dried Items", name: "DARK SOY SAUCE", cn: "老抽", pack: "5L", origin: "-", price: 13.00, unit: "BTL" },
  { cat: "Dried Items", name: "GARAM MASALA", cn: "印度香料粉", pack: "70g", origin: "-", price: 2.75, unit: "PC" },
  { cat: "Dried Items", name: "LIGHT SOY SAUCE", cn: "淡酱油", pack: "5L", origin: "-", price: 13.00, unit: "BTL" },
  { cat: "Dried Items", name: "M.S.G", cn: "味精", pack: "1kg", origin: "-", price: 5.60, unit: "PC" },
  { cat: "Dried Items", name: "WHITE RICE", cn: "白米", pack: "25kg", origin: "-", price: 32.00, unit: "BAG" },
  { cat: "Dried Items", name: "SALT", cn: "盐", pack: "500g", origin: "-", price: 0.50, unit: "PC" },
  { cat: "Dried Items", name: "SELF-RAISING FLOUR", cn: "自发粉", pack: "1kg", origin: "-", price: 2.40, unit: "PC" },
  { cat: "Dried Items", name: "SMOKED PAPRIKA", cn: "烟熏辣椒粉", pack: "1kg", origin: "-", price: 18.75, unit: "PC" },
  { cat: "Dried Items", name: "SUGAR", cn: "糖", pack: "1kg", origin: "-", price: 1.60, unit: "PC" },
  { cat: "Dried Items", name: "SUGAR BULK", cn: "糖", pack: "25kg", origin: "-", price: 30.00, unit: "BAG" },
  { cat: "Dried Items", name: "VEGETABLE OIL", cn: "油", pack: "15kg", origin: "-", price: 36.00, unit: "TIN" },
  { cat: "Dried Items", name: "VEGETABLE OIL", cn: "油", pack: "5L", origin: "-", price: 9.50, unit: "BTL" },
  { cat: "Dried Items", name: "WHITE PEPPER", cn: "白胡椒", pack: "1kg", origin: "-", price: 18.10, unit: "PC" },
  { cat: "Dried Items", name: "SARDINE", cn: "沙丁鱼", pack: "425g", origin: "-", price: 1.50, unit: "PC" },
  { cat: "Dried Items", name: "WHEAT FLOUR", cn: "面粉", pack: "25kg", origin: "-", price: 25.90, unit: "BAG" },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState({});
  const [collapsedCats, setCollapsedCats] = useState({});
  const [copied, setCopied] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // Grouping and Filtering
  const groupedData = useMemo(() => {
    const groups = {};
    RAW_DATA.forEach(item => {
      const match = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    item.cn.includes(searchTerm) || 
                    item.cat.toLowerCase().includes(searchTerm.toLowerCase());
      if (!match) return;

      if (!groups[item.cat]) groups[item.cat] = [];
      groups[item.cat].push(item);
    });
    return groups;
  }, [searchTerm]);

  const updateCart = (item, delta) => {
    const key = `${item.name}-${item.pack}-${item.price}`;
    setCart(prev => {
      const next = { ...prev };
      const currentQty = next[key]?.qty || 0;
      const newQty = currentQty + delta;
      
      if (newQty <= 0) delete next[key];
      else next[key] = { ...item, qty: newQty };
      return next;
    });
  };

  const totalCost = Object.values(cart).reduce((s, i) => s + (i.price * i.qty), 0);
  const totalItems = Object.values(cart).reduce((s, i) => s + i.qty, 0);

  const generateOrderText = () => {
    let text = `*LIM TRADERS ORDER*\nDate: ${new Date().toLocaleDateString()}\n`;
    text += `Customer: _________________\n`;
    text += `---------------------------\n`;
    Object.values(cart).forEach(i => {
      text += `[${i.qty}] ${i.name}\n    ${i.cn} | ${i.pack} | $${i.price}/${i.unit}\n`;
    });
    text += `---------------------------\n`;
    text += `*Est. Total: $${totalCost.toFixed(2)}*`;
    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateOrderText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-32">
      {/* Header */}
      <header className="bg-red-700 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black italic tracking-tighter">LIM TRADERS</h1>
            <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Pricing 15/12/2025 • Full Catalog</p>
          </div>
          <button onClick={() => setShowCart(true)} className="relative p-2 bg-red-800 rounded-full hover:bg-red-900 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-white text-red-700 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg">{totalItems}</span>}
          </button>
        </div>
      </header>

      {/* Search */}
      <div className="p-4 bg-white border-b sticky top-[64px] z-40">
        <div className="max-w-4xl mx-auto relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-red-600 transition-colors" />
          <input 
            type="text"
            placeholder="Search Item (e.g. 'Beef Cube', 'Fries', 'Oil')..."
            className="w-full bg-slate-100 border-none rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-red-500 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto p-4 space-y-3">
        {Object.keys(groupedData).length === 0 ? (
          <div className="text-center py-20 text-slate-300">
            <FileText className="w-16 h-16 mx-auto mb-4 stroke-1" />
            <p className="font-bold">No products found</p>
          </div>
        ) : (
          Object.entries(groupedData).map(([cat, items]) => (
            <div key={cat} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <button 
                onClick={() => setCollapsedCats(p => ({ ...p, [cat]: !p[cat] }))}
                className="w-full flex items-center justify-between p-4 bg-slate-50 border-b hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 text-red-700 p-1.5 rounded-lg">
                    <ArrowDownWideNarrow className="w-4 h-4" />
                  </div>
                  <h2 className="font-black text-slate-700 text-sm sm:text-base uppercase">{cat}</h2>
                </div>
                {collapsedCats[cat] ? <ChevronDown className="text-slate-400" /> : <ChevronUp className="text-slate-400" />}
              </button>

              {!collapsedCats[cat] && (
                <div className="divide-y divide-slate-50">
                  {items.map((item, idx) => {
                    const key = `${item.name}-${item.pack}-${item.price}`;
                    const qty = cart[key]?.qty || 0;
                    return (
                      <div key={idx} className="flex items-center justify-between p-3 sm:p-4 hover:bg-slate-50/50 transition-colors">
                        <div className="flex-1 pr-2">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-black text-slate-800 text-sm leading-tight">{item.name}</span>
                            {item.origin !== '-' && <span className="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase">{item.origin}</span>}
                          </div>
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">{item.cn} • {item.pack}</p>
                        </div>

                        <div className="flex flex-col items-end gap-2 min-w-[80px]">
                          <div className="text-right">
                            <span className="text-sm font-black text-red-600">${item.price.toFixed(2)}</span>
                            <span className="text-[9px] text-slate-400 block font-bold uppercase leading-none">/{item.unit}</span>
                          </div>

                          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg gap-2 shadow-inner">
                            {qty > 0 ? (
                              <>
                                <button onClick={() => updateCart(item, -1)} className="p-1 bg-white text-red-600 rounded shadow-sm"><Minus className="w-3.5 h-3.5" /></button>
                                <span className="font-black text-xs w-4 text-center">{qty}</span>
                                <button onClick={() => updateCart(item, 1)} className="p-1 bg-white text-red-600 rounded shadow-sm"><Plus className="w-3.5 h-3.5" /></button>
                              </>
                            ) : (
                              <button onClick={() => updateCart(item, 1)} className="px-3 py-1 bg-slate-800 text-white rounded text-[10px] font-bold uppercase hover:bg-red-600 transition-colors">Add</button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))
        )}
      </main>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] animate-in slide-in-from-bottom duration-300">
            <div className="p-5 border-b flex items-center justify-between bg-white rounded-t-3xl">
              <div>
                <h2 className="text-xl font-black text-slate-800">Your Order</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{totalItems} Items Selected</p>
              </div>
              <button onClick={() => setShowCart(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200"><Plus className="w-6 h-6 rotate-45" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-50">
              {totalItems === 0 ? (
                <div className="py-20 text-center text-slate-300">
                  <ShoppingCart className="w-16 h-16 mx-auto opacity-20" />
                  <p className="font-bold mt-2">Cart is empty</p>
                </div>
              ) : (
                Object.values(cart).map((i, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex-1">
                      <h4 className="font-black text-xs text-slate-800">{i.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{i.pack}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-red-600 text-sm w-16 text-right">${(i.price * i.qty).toFixed(2)}</span>
                      <div className="flex items-center bg-slate-100 rounded-lg scale-90">
                        <button onClick={() => updateCart(i, -1)} className="p-1.5"><Minus className="w-3.5 h-3.5" /></button>
                        <span className="w-5 text-center text-xs font-bold">{i.qty}</span>
                        <button onClick={() => updateCart(i, 1)} className="p-1.5"><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-5 border-t bg-white space-y-4 rounded-b-3xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estimated Total</span>
                <span className="text-3xl font-black text-red-600">${totalCost.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={handleCopy}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all active:scale-95 shadow-lg ${
                    copied ? 'bg-green-600 text-white' : 'bg-slate-900 text-white hover:bg-black'
                  }`}
                >
                  {copied ? <CheckCircle2 className="w-5 h-5" /> : <ClipboardList className="w-5 h-5" />}
                  {copied ? 'Copied!' : 'Copy Order'}
                </button>
                <button 
                  onClick={() => { if(confirm('Clear cart?')) setCart({}); }}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm border-2 border-slate-100 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bar */}
      {totalItems > 0 && !showCart && (
        <div className="fixed bottom-6 left-4 right-4 z-40 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={() => setShowCart(true)}
            className="w-full bg-red-600 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between hover:bg-red-700 active:scale-[0.98] transition-all shadow-red-200"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold opacity-80 uppercase leading-none">Checkout</p>
                <p className="font-black text-lg leading-none">{totalItems} Items</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold opacity-80 uppercase leading-none">Total</p>
              <p className="font-black text-2xl leading-none">${totalCost.toFixed(2)}</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
