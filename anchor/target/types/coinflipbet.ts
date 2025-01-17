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
          "name": "coinflipbet",
          "writable": true
        }
      ],
      "args": []
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
          "name": "coinflipbet",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "decrement",
      "discriminator": [
        106,
        227,
        168,
        59,
        248,
        27,
        150,
        101
      ],
      "accounts": [
        {
          "name": "coinflipbet",
          "writable": true
        }
      ],
      "args": []
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
          "name": "coinflipbet",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  105,
                  110,
                  102,
                  108,
                  105,
                  112
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
      "name": "set",
      "discriminator": [
        198,
        51,
        53,
        241,
        116,
        29,
        126,
        194
      ],
      "accounts": [
        {
          "name": "coinflipbet",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "value",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "coinflipbet",
      "discriminator": [
        43,
        67,
        202,
        144,
        171,
        102,
        58,
        228
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
      "name": "coinflipbet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "roll",
            "type": "u32"
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
    },
    {
      "name": "wager",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "count",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
