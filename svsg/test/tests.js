QUnit.test( "Default queen.getColumn() return 0", function( assert ) {

    var queen = new Svsg.queen(0);
    var column = queen.getColumn();

    assert.ok( column == 0, "Passed!" );
  });

  QUnit.test( "queen.getColumn() and Size is 10 return >= 0 <= 10", function( assert ) {
    
        Svsg.globals.size = 10;
        var queen = new Svsg.queen(0);
        var column = queen.getColumn();
    
        assert.ok( column >= 0 && column <= 10, "Passed!" );
      });

QUnit.test( "defaut direction", function( assert ) {
  
      var result = new Svsg.direction(Svsg.queenDirectionEnum);
        
      assert.ok( result.currentDirection == Svsg.queenDirectionEnum.UP, "Passed!" );
    });

QUnit.test( "next direction", function( assert ) {
    
        var result = new Svsg.direction(Svsg.queenDirectionEnum);
        result.next();
          
        assert.ok( result.currentDirection == Svsg.queenDirectionEnum.UPRIGHT, "Passed!" );
      });