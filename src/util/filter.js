let common = {
      eq(a, b){ return a === b },
      neq(a, b){ return a !== b },
      gt(a, b){ return a > b   },
      gte(a, b){ return a >= b  },
      lt(a, b){ return a < b   },
      lte(a, b){ return a <= b  },

      contains(a, b){
        return a.indexOf(b) !== -1
      },

      startsWith(a, b) {
        return a.lastIndexOf(b, 0) === 0;
      },

      endsWith(a, b) {
        var pos = a.length - b.length
          , lastIndex = a.indexOf(b, pos);

        return  lastIndex !== -1 && lastIndex === pos;
      }
    }

export default common;
