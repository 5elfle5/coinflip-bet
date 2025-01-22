/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/coinflipbet.json`.
 */
export type Coinflipbet = {
  "address": "coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF",
  "metadata": {
    "name": "coinflipbet",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "bet",
      "discriminator": [
        94,
        203,
        166,
        126,
        20,
        243,
        169,
        82
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "wager",
          "writable": true
        },
        {
          "name": "bankroll",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  110,
                  107,
                  114,
                  111,
                  108,
                  108
                ]
              },
              {
                "kind": "const",
                "value": [
                  9,
                  43,
                  225,
                  230,
                  237,
                  13,
                  216,
                  237,
                  44,
                  121,
                  170,
                  202,
                  171,
                  13,
                  123,
                  122,
                  17,
                  76,
                  28,
                  165,
                  22,
                  109,
                  84,
                  97,
                  252,
                  22,
                  20,
                  59,
                  1,
                  116,
                  88,
                  174
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "close",
      "discriminator": [
        98,
        165,
        201,
        177,
        108,
        65,
        206,
        96
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "wager",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "createWager",
      "discriminator": [
        210,
        82,
        178,
        75,
        253,
        34,
        84,
        120
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "wager",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  97,
                  103,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "flip",
      "discriminator": [
        24,
        243,
        78,
        161,
        192,
        246,
        102,
        103
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "wager",
          "writable": true
        },
        {
          "name": "bankroll",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  110,
                  107,
                  114,
                  111,
                  108,
                  108
                ]
              },
              {
                "kind": "const",
                "value": [
                  9,
                  43,
                  225,
                  230,
                  237,
                  13,
                  216,
                  237,
                  44,
                  121,
                  170,
                  202,
                  171,
                  13,
                  123,
                  122,
                  17,
                  76,
                  28,
                  165,
                  22,
                  109,
                  84,
                  97,
                  252,
                  22,
                  20,
                  59,
                  1,
                  116,
                  88,
                  174
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "bankroll",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  110,
                  107,
                  114,
                  111,
                  108,
                  108
                ]
              },
              {
                "kind": "const",
                "value": [
                  9,
                  43,
                  225,
                  230,
                  237,
                  13,
                  216,
                  237,
                  44,
                  121,
                  170,
                  202,
                  171,
                  13,
                  123,
                  122,
                  17,
                  76,
                  28,
                  165,
                  22,
                  109,
                  84,
                  97,
                  252,
                  22,
                  20,
                  59,
                  1,
                  116,
                  88,
                  174
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "topup",
      "discriminator": [
        126,
        42,
        49,
        78,
        225,
        151,
        99,
        77
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "bankroll",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  110,
                  107,
                  114,
                  111,
                  108,
                  108
                ]
              },
              {
                "kind": "const",
                "value": [
                  9,
                  43,
                  225,
                  230,
                  237,
                  13,
                  216,
                  237,
                  44,
                  121,
                  170,
                  202,
                  171,
                  13,
                  123,
                  122,
                  17,
                  76,
                  28,
                  165,
                  22,
                  109,
                  84,
                  97,
                  252,
                  22,
                  20,
                  59,
                  1,
                  116,
                  88,
                  174
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "bankroll",
      "discriminator": [
        136,
        99,
        239,
        106,
        251,
        134,
        101,
        186
      ]
    },
    {
      "name": "wager",
      "discriminator": [
        3,
        110,
        53,
        190,
        113,
        31,
        230,
        40
      ]
    }
  ],
  "types": [
    {
      "name": "bankroll",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "wager",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "roll",
            "type": "i64"
          },
          {
            "name": "won",
            "type": "bool"
          },
          {
            "name": "betOnSide",
            "type": "u8"
          },
          {
            "name": "count",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
