
export const NoFlags = /*                      */ 0b00000000000000000000000000;

export const Placement = /*                    */ 0b00000000000000000000000010;
export const Update = /*                       */ 0b00000000000000000000000100;
export const Deletion = /*                     */ 0b00000000000000000000001000;
export const Ref = /*                          */ 0b00000000000000001000000000;

export const Forked = /*                       */ 0b00000100000000000000000000;


export const Incomplete = /*                   */ 0b00000000001000000000000000;

export const MutationMask = Placement | Update | Ref;
export const LayoutMask = Update | Ref;